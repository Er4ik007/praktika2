import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Download, X, Filter } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { venues } from '../data';
import { translations } from '../i18n/translations';

interface Booking {
  id: number;
  venue_id: string;
  venue_name: string;
  name: string;
  date: string;
  guests: string;
  phone: string;
  message: string | null;
  cancel_reason: string | null;
  status: string;
  created_at: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  source: string;
  category: string | null;
  created_at: string;
}

const API = 'https://praktika2-vkkr.onrender.com';

export const AdminPage = () => {
  const navigate = useNavigate();
  const { t, tv } = useLang();
  const [activeTab, setActiveTab] = useState<'bookings' | 'messages' | 'export'>('bookings');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [bookingFilter, setBookingFilter] = useState<'all' | 'active' | 'cancelled'>('all');
  const [messageFilter, setMessageFilter] = useState<'all' | 'contact' | 'support'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [cancelModal, setCancelModal] = useState<{ bookingId: number; reason: string } | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingDateFrom, setBookingDateFrom] = useState('');
  const [bookingDateTo, setBookingDateTo] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [messageDate, setMessageDate] = useState('');

  const [bookingSort, setBookingSort] = useState<{ key: 'id' | 'name' | 'date'; asc: boolean }>({ key: 'id', asc: false });
  const [messageSort, setMessageSort] = useState<{ key: 'id' | 'name' | 'date'; asc: boolean }>({ key: 'id', asc: false });

  const token = localStorage.getItem('token');

  const translateVenueName = (booking: Booking) => {
    const translatedName = tv(`venue.name.${booking.venue_id}`, '');
    if (translatedName) {
      const addrMatch = booking.venue_name.match(/\((.+)\)$/);
      if (addrMatch) {
        const venue = venues.find(v => v.id === booking.venue_id);
        let branchIdx = -1;
        if (venue) {
          for (let bi = 0; bi < venue.branches.length; bi++) {
            const addrKey = `venue.${booking.venue_id}.addr${bi}`;
            const addrEntry = translations[addrKey];
            if (addrEntry) {
              const allAddrs = Object.values(addrEntry) as string[];
              if (allAddrs.some(a => booking.venue_name.includes(a))) {
                branchIdx = bi;
                break;
              }
            }
            if (booking.venue_name.includes(venue.branches[bi].address)) {
              branchIdx = bi;
              break;
            }
          }
        }
        const translatedAddr = branchIdx >= 0 ? tv(`venue.${booking.venue_id}.addr${branchIdx}`, addrMatch[1]) : addrMatch[1];
        return `${translatedName} (${translatedAddr})`;
      }
      return translatedName;
    }
    return booking.venue_name;
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API}/api/admin/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      setBookings(await res.json());
    } catch { navigate('/404'); }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API}/api/admin/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      setMessages(await res.json());
    } catch { navigate('/404'); }
  };

  useEffect(() => {
    Promise.all([fetchBookings(), fetchMessages()]).finally(() => setIsLoading(false));
  }, []);

  const handleCancelBooking = async () => {
    if (!cancelModal) return;
    setCancelling(true);
    try {
      const res = await fetch(`${API}/api/admin/bookings/${cancelModal.bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled', reason: cancelModal.reason || null })
      });
      if (!res.ok) throw new Error();
      setBookings(prev => prev.map(b =>
        b.id === cancelModal.bookingId ? { ...b, status: 'cancelled', cancel_reason: cancelModal.reason } : b
      ));
      setCancelModal(null);
    } catch (err) { alert(t('admin.cancelError')); }
    finally { setCancelling(false); }
  };

  const handleRestoreBooking = async (bookingId: number) => {
    try {
      const res = await fetch(`${API}/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active', reason: null })
      });
      if (!res.ok) throw new Error();
      setBookings(prev => prev.map(b =>
        b.id === bookingId ? { ...b, status: 'active', cancel_reason: null } : b
      ));
    } catch (err) { alert(t('admin.restoreError')); }
  };

  const handleExport = async () => {
    try {
      const res = await fetch(`${API}/api/admin/export/bookings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bookings_report.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert(t('admin.exportError')); }
  };

  const handleExportMessages = async () => {
    try {
      const res = await fetch(`${API}/api/admin/export/messages`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'messages_report.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) { alert(t('admin.exportError')); }
  };

  const filteredBookings = bookings.filter(b => {
    if (bookingFilter !== 'all' && b.status !== bookingFilter) return false;
    if (bookingSearch) {
      const q = bookingSearch.toLowerCase();
      if (!b.name.toLowerCase().includes(q)) return false;
    }
    if (bookingDateFrom || bookingDateTo) {
      const created = new Date(b.created_at);
      if (bookingDateFrom && created < new Date(bookingDateFrom)) return false;
      if (bookingDateTo) {
        const to = new Date(bookingDateTo);
        to.setHours(23, 59, 59, 999);
        if (created > to) return false;
      }
    }
    return true;
  }).sort((a, b) => {
    const dir = bookingSort.asc ? 1 : -1;
    if (bookingSort.key === 'id') return (a.id - b.id) * dir;
    if (bookingSort.key === 'name') return a.name.localeCompare(b.name, 'ru') * dir;
    return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir;
  });

  const filteredMessages = messages.filter(m => {
    if (messageFilter !== 'all' && m.source !== messageFilter) return false;
    if (messageSearch) {
      const q = messageSearch.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q)) return false;
    }
    if (messageDate) {
      const created = new Date(m.created_at);
      const day = new Date(messageDate);
      if (created.toDateString() !== day.toDateString()) return false;
    }
    return true;
  }).sort((a, b) => {
    const dir = messageSort.asc ? 1 : -1;
    if (messageSort.key === 'id') return (a.id - b.id) * dir;
    if (messageSort.key === 'name') return a.name.localeCompare(b.name, 'ru') * dir;
    return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir;
  });

  const tabs = [
    { key: 'bookings' as const, label: t('admin.bookings'), count: bookings.length },
    { key: 'messages' as const, label: t('admin.messages'), count: messages.length },
    { key: 'export' as const, label: t('admin.export'), count: null },
  ];

  if (isLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '60vh', paddingTop: '120px' }}>
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: '2rem', minHeight: '80vh' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <Shield className="text-danger" size={32} />
          <div>
            <h1 className="h3 fw-black text-body-emphasis mb-0">{t('admin.title')}</h1>
            <p className="text-body-secondary small mb-0">{bookings.length} {t('admin.stats').replace('{messages}', String(messages.length))}</p>
          </div>
        </div>

        <ul className="nav nav-pills gap-2 mb-4">
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                className={`nav-link fw-bold rounded-pill px-4 py-2 ${activeTab === tab.key ? 'bg-danger text-white' : 'text-body'}`}
              >
                {tab.label} {tab.count !== null && <span className="badge bg-body-secondary text-body ms-1">{tab.count}</span>}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === 'bookings' && (
          <div>
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <Filter size={16} className="text-body-secondary" />
              {([
                { key: 'all' as const, label: t('admin.filterAll') },
                { key: 'active' as const, label: t('admin.filterActive') },
                { key: 'cancelled' as const, label: t('admin.filterCancelled') },
              ]).map(f => (
                <button
                  key={f.key}
                  onClick={() => setBookingFilter(f.key)}
                  className={`btn btn-sm rounded-pill fw-bold ${bookingFilter === f.key ? 'btn-danger text-white' : 'btn-outline-secondary'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="d-flex gap-2 mb-3 flex-wrap align-items-center">
              <input
                type="text"
                value={bookingSearch}
                onChange={e => setBookingSearch(e.target.value)}
                placeholder={t('admin.searchByName')}
                className="form-control form-control-sm rounded-pill bg-body border px-3 py-2"
                style={{ maxWidth: '250px' }}
              />
              <div className="d-flex align-items-center gap-1">
                <span className="text-body-secondary small fw-bold">{t('admin.dateFrom')}:</span>
                <input
                  type="date"
                  value={bookingDateFrom}
                  onChange={e => setBookingDateFrom(e.target.value)}
                  className="form-control form-control-sm rounded-pill bg-body border px-3 py-2"
                  style={{ maxWidth: '160px' }}
                />
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="text-body-secondary small fw-bold">{t('admin.dateTo')}:</span>
                <input
                  type="date"
                  value={bookingDateTo}
                  onChange={e => setBookingDateTo(e.target.value)}
                  className="form-control form-control-sm rounded-pill bg-body border px-3 py-2"
                  style={{ maxWidth: '160px' }}
                />
              </div>
              {(bookingSearch || bookingDateFrom || bookingDateTo) && (
                <button onClick={() => { setBookingSearch(''); setBookingDateFrom(''); setBookingDateTo(''); }} className="btn btn-sm btn-outline-secondary rounded-pill">
                  {t('admin.clearFilters')}
                </button>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-body-tertiary">
                  <tr>
                    <th className="text-body-secondary fw-bold user-select-none" style={{ cursor: 'pointer' }} onClick={() => setBookingSort(s => s.key === 'id' ? { key: 'id', asc: !s.asc } : { key: 'id', asc: true })}>
                      {t('admin.thId')} <span className={bookingSort.key === 'id' ? 'text-danger' : 'opacity-30'}>{bookingSort.key === 'id' && bookingSort.asc ? '↑' : '↓'}</span>
                    </th>
                    <th className="text-body-secondary fw-bold user-select-none" style={{ cursor: 'pointer' }} onClick={() => setBookingSort(s => s.key === 'name' ? { key: 'name', asc: !s.asc } : { key: 'name', asc: true })}>
                      {t('admin.thName')} <span className={bookingSort.key === 'name' ? 'text-danger' : 'opacity-30'}>{bookingSort.key === 'name' && bookingSort.asc ? '↑' : '↓'}</span>
                    </th>
                    <th className="text-body-secondary fw-bold">{t('admin.thPhone')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thVenue')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thDate')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thGuests')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thStatus')}</th>
                    <th className="text-body-secondary fw-bold user-select-none" style={{ cursor: 'pointer' }} onClick={() => setBookingSort(s => s.key === 'date' ? { key: 'date', asc: !s.asc } : { key: 'date', asc: false })}>
                      {t('admin.thCreated')} <span className={bookingSort.key === 'date' ? 'text-danger' : 'opacity-30'}>{bookingSort.key === 'date' && bookingSort.asc ? '↑' : '↓'}</span>
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr><td colSpan={9} className="text-center text-body-secondary py-4">{t('admin.noBookings')}</td></tr>
                  ) : filteredBookings.map(b => (
                    <tr key={b.id}>
                      <td className="fw-bold">#{b.id}</td>
                      <td>{b.name}</td>
                      <td>{b.phone}</td>
                      <td>{translateVenueName(b)}</td>
                      <td>{b.date}</td>
                      <td>{b.guests}</td>
                      <td>
                        <span className={`badge rounded-pill ${b.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                          {b.status === 'active' ? t('admin.statusActive') : t('admin.statusCancelled')}
                        </span>
                      </td>
                      <td className="text-body-secondary small">{new Date(b.created_at).toLocaleDateString('ru-RU')}</td>
                      <td>
                        {b.status === 'active' ? (
                          <button onClick={() => setCancelModal({ bookingId: b.id, reason: '' })} className="btn btn-sm btn-outline-danger rounded-pill">
                            {t('admin.cancel')}
                          </button>
                        ) : (
                          <button onClick={() => handleRestoreBooking(b.id)} className="btn btn-sm btn-outline-success rounded-pill">
                            {t('admin.restore')}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <Filter size={16} className="text-body-secondary" />
              {([
                { key: 'all' as const, label: t('admin.filterAll') },
                { key: 'contact' as const, label: t('admin.filterContact') },
                { key: 'support' as const, label: t('admin.filterSupport') },
              ]).map(f => (
                <button
                  key={f.key}
                  onClick={() => setMessageFilter(f.key)}
                  className={`btn btn-sm rounded-pill fw-bold ${messageFilter === f.key ? 'btn-danger text-white' : 'btn-outline-secondary'}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="d-flex gap-2 mb-3 flex-wrap align-items-center">
              <input
                type="text"
                value={messageSearch}
                onChange={e => setMessageSearch(e.target.value)}
                placeholder={t('admin.searchByNameOrEmail')}
                className="form-control form-control-sm rounded-pill bg-body border px-3 py-2"
                style={{ maxWidth: '250px' }}
              />
              <div className="d-flex align-items-center gap-1">
                <span className="text-body-secondary small fw-bold">{t('admin.dateFilter')}:</span>
                <input
                  type="date"
                  value={messageDate}
                  onChange={e => setMessageDate(e.target.value)}
                  className="form-control form-control-sm rounded-pill bg-body border px-3 py-2"
                  style={{ maxWidth: '160px' }}
                />
              </div>
              {(messageSearch || messageDate) && (
                <button onClick={() => { setMessageSearch(''); setMessageDate(''); }} className="btn btn-sm btn-outline-secondary rounded-pill">
                  {t('admin.clearFilters')}
                </button>
              )}
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-body-tertiary">
                  <tr>
                    <th className="text-body-secondary fw-bold user-select-none" style={{ cursor: 'pointer' }} onClick={() => setMessageSort(s => s.key === 'id' ? { key: 'id', asc: !s.asc } : { key: 'id', asc: true })}>
                      {t('admin.thId')} <span className={messageSort.key === 'id' ? 'text-danger' : 'opacity-30'}>{messageSort.key === 'id' && messageSort.asc ? '↑' : '↓'}</span>
                    </th>
                    <th className="text-body-secondary fw-bold user-select-none" style={{ cursor: 'pointer' }} onClick={() => setMessageSort(s => s.key === 'name' ? { key: 'name', asc: !s.asc } : { key: 'name', asc: true })}>
                      {t('admin.thName')} <span className={messageSort.key === 'name' ? 'text-danger' : 'opacity-30'}>{messageSort.key === 'name' && messageSort.asc ? '↑' : '↓'}</span>
                    </th>
                    <th className="text-body-secondary fw-bold">{t('admin.thEmail')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thSubject')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thSource')}</th>
                    <th className="text-body-secondary fw-bold">{t('admin.thMessage')}</th>
                    <th className="text-body-secondary fw-bold user-select-none" style={{ cursor: 'pointer' }} onClick={() => setMessageSort(s => s.key === 'date' ? { key: 'date', asc: !s.asc } : { key: 'date', asc: false })}>
                      {t('admin.thDate')} <span className={messageSort.key === 'date' ? 'text-danger' : 'opacity-30'}>{messageSort.key === 'date' && messageSort.asc ? '↑' : '↓'}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.length === 0 ? (
                    <tr><td colSpan={7} className="text-center text-body-secondary py-4">{t('admin.noMessages')}</td></tr>
                  ) : filteredMessages.map(m => (
                    <tr key={m.id}>
                      <td className="fw-bold">#{m.id}</td>
                      <td>{m.name}</td>
                      <td className="small">{m.email}</td>
                      <td>{m.subject}</td>
                      <td>
                        <span className={`badge rounded-pill ${m.source === 'support' ? 'bg-info text-dark' : 'bg-primary'}`}>
                          {m.source === 'support' ? t('admin.filterSupport') : t('admin.filterContact')}
                        </span>
                      </td>
                      <td className="text-body-secondary small" style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.message}
                      </td>
                      <td className="text-body-secondary small">{new Date(m.created_at).toLocaleDateString('ru-RU')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div className="d-flex flex-column align-items-center py-5 gap-4">
            <div className="card bg-body-tertiary border-0 rounded-4 shadow-sm p-5 w-100" style={{ maxWidth: '500px' }}>
              <Download className="text-danger mb-3 mx-auto" size={48} />
              <h3 className="fw-black text-body-emphasis mb-2 text-center">{t('admin.exportTitle')}</h3>
              <p className="text-body-secondary mb-4 text-center">
                {t('admin.exportDesc')}
              </p>
              <button onClick={handleExport} className="btn btn-danger btn-lg rounded-pill fw-bold px-5 py-3 d-inline-flex align-items-center justify-content-center gap-2">
                <Download size={20} /> {t('admin.exportBtn')}
              </button>
              <p className="text-body-secondary small mt-3 mb-0 text-center">
                {bookings.length} {t('admin.exportStats')}
              </p>
            </div>

            <div className="card bg-body-tertiary border-0 rounded-4 shadow-sm p-5 w-100" style={{ maxWidth: '500px' }}>
              <Download className="text-primary mb-3 mx-auto" size={48} />
              <h3 className="fw-black text-body-emphasis mb-2 text-center">{t('admin.exportMessagesTitle')}</h3>
              <p className="text-body-secondary mb-4 text-center">
                {t('admin.exportMessagesDesc')}
              </p>
              <button onClick={handleExportMessages} className="btn btn-primary btn-lg rounded-pill fw-bold px-5 py-3 d-inline-flex align-items-center justify-content-center gap-2">
                <Download size={20} /> {t('admin.exportMessagesBtn')}
              </button>
              <p className="text-body-secondary small mt-3 mb-0 text-center">
                {messages.length} {t('admin.exportMessagesStats')}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {cancelModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card bg-body-tertiary border-0 rounded-4 shadow-lg p-4 w-100" style={{ maxWidth: '400px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-black mb-0">{t('admin.cancelTitle')} #{cancelModal.bookingId}</h5>
              <button onClick={() => setCancelModal(null)} className="btn btn-link p-0 text-body-secondary"><X size={20} /></button>
            </div>
            <p className="text-body-secondary small mb-3">{t('admin.cancelReason')}</p>
            <textarea
              value={cancelModal.reason}
              onChange={e => setCancelModal({ ...cancelModal, reason: e.target.value })}
              className="form-control rounded-3 bg-body border-0 mb-3"
              rows={3}
              placeholder={t('admin.cancelReasonPlaceholder')}
            />
            <div className="d-flex gap-2">
              <button onClick={() => setCancelModal(null)} className="btn btn-outline-secondary rounded-pill flex-fill">{t('common.cancel')}</button>
              <button onClick={handleCancelBooking} disabled={cancelling} className="btn btn-danger rounded-pill flex-fill fw-bold">
                {cancelling ? <span className="spinner-border spinner-border-sm"></span> : t('admin.cancelConfirm')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .fw-black { font-weight: 900; }
      `}</style>
    </div>
  );
};
