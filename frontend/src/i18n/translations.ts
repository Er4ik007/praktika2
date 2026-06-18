export type Lang = 'ru' | 'be' | 'en' | 'pl' | 'zh';

export interface Translations {
  [key: string]: Record<Lang, string>;
}

export const translations: Translations = {
  // Header
  'nav.home': { ru: 'Главная', be: 'Галоўная', en: 'Home', pl: 'Strona główna', zh: '首页' },
  'nav.catalog': { ru: 'Каталог', be: 'Каталог', en: 'Catalog', pl: 'Katalog', zh: '目录' },
  'nav.about': { ru: 'О нас', be: 'Пра нас', en: 'About', pl: 'O nas', zh: '关于我们' },
  'nav.contacts': { ru: 'Контакты', be: 'Кантакты', en: 'Contacts', pl: 'Kontakty', zh: '联系方式' },
  'nav.login': { ru: 'Войти', be: 'Увайсці', en: 'Sign in', pl: 'Zaloguj się', zh: '登录' },
  'nav.profile': { ru: 'Мой профиль', be: 'Мой профіль', en: 'My Profile', pl: 'Mój profil', zh: '我的资料' },

  // Home page
  'home.slide1.title': { ru: 'Гастрономический Минск', be: 'Гастранамічны Мінск', en: 'Gastronomic Minsk', pl: 'Gastronomiczny Mińsk', zh: '美食明斯克' },
  'home.slide1.subtitle': { ru: 'Откройте для себя лучшие вкусы столицы', be: 'Адкрыйце для сябе лепшыя густы сталіцы', en: 'Discover the best flavors of the capital', pl: 'Odkryj najlepsze smaki stolicy', zh: '探索首都最佳风味' },
  'home.slide2.title': { ru: 'Белорусская Кухня', be: 'Беларуская Кухня', en: 'Belarusian Cuisine', pl: 'Kuchnia białoruska', zh: '白俄罗斯美食' },
  'home.slide2.subtitle': { ru: 'Традиции, драники и мачанка в лучшем исполнении', be: 'Традыцыі, дранікі і мачанка ў лепшым выкананні', en: 'Traditions, draniki and machanka at their best', pl: 'Tradycje, draniki i machanka w najlepszym wydaniu', zh: '传统、土豆饼和马昌卡的最佳呈现' },
  'home.slide3.title': { ru: 'Рестораны', be: 'Рэстараны', en: 'Restaurants', pl: 'Restauracje', zh: '餐厅' },
  'home.slide3.subtitle': { ru: 'Идеальные места для идеального ужина', be: 'Ідэальныя месцы для ідэальнага вячэры', en: 'Perfect places for a perfect dinner', pl: 'Idealne miejsca na idealną kolację', zh: '完美晚餐的理想场所' },
  'home.slide4.title': { ru: 'Культура Кофе', be: 'Культура Кавы', en: 'Coffee Culture', pl: 'Kultura kawy', zh: '咖啡文化' },
  'home.slide4.subtitle': { ru: 'Лучшие спешелти кофейни в центре города', be: 'Лепшыя спэшэлці-кавярні ў цэнтры горада', en: 'Best specialty coffee shops in the city center', pl: 'Najlepsze kawiarnie specjalistyczne w centrum', zh: '市中心最好的精品咖啡店' },
  'home.slide5.title': { ru: 'Атмосферные Бары', be: 'Атмасферныя Бары', en: 'Atmospheric Bars', pl: 'Atmosferyczne bary', zh: '氛围酒吧' },
  'home.slide5.subtitle': { ru: 'Авторские коктейли, крафт и живая музыка', be: 'Аўтарскія кактэйлі, крафт і жывая музыка', en: 'Signature cocktails, craft beer and live music', pl: 'Autorskie koktajle, kraft i muzyka na żywo', zh: '特色鸡尾酒、精酿啤酒和现场音乐' },
  'home.goto': { ru: 'Перейти', be: 'Перайсці', en: 'Go', pl: 'Przejdź', zh: '前往' },
  'home.popular': { ru: 'Популярное', be: 'Папулярнае', en: 'Popular', pl: 'Popularne', zh: '热门' },
  'home.allList': { ru: 'Весь список', be: 'Увесь спіс', en: 'Full list', pl: 'Pełna lista', zh: '完整列表' },
  'home.about.title': { ru: 'Минск — это про еду и атмосферу', be: 'Мінск — гэта пра еду і атмасферу', en: 'Minsk is about food and atmosphere', pl: 'Mińsk to o jedzeniu i atmosferze', zh: '明斯克——关于美食和氛围' },
  'home.about.desc': { ru: 'Мы лично проверяем каждое заведение, прежде чем добавить его в каталог. Честные отзывы, актуальные меню и бронирование в пару кликов.', be: 'Мы асабіста правяраем кожнае ўстанову, перш чым дадаць яго ў каталог. Чесныя водгукі, актуальнае меню і браніраванне ў пару клікаў.', en: 'We personally verify every venue before adding it to our catalog. Honest reviews, up-to-date menus and booking in a couple of clicks.', pl: 'Osobiście sprawdzamy każde miejsce, zanim dodamy je do katalogu. Szczere recenzje, aktualne menu i rezerwacja w kilka kliknięć.', zh: '我们亲自验证每个场所，然后将其添加到目录中。诚实的评论、最新的菜单，只需几次点击即可预订。' },
  'home.stats.places': { ru: 'Проверенных мест', be: 'Правераных месцаў', en: 'Verified places', pl: 'Sprawdzonych miejsc', zh: '已验证场所' },
  'home.stats.guests': { ru: 'Довольных гостей', be: 'Задаволеных гасцей', en: 'Happy guests', pl: 'Zadowolonych gości', zh: '满意的客人' },
  'home.stats.reviews': { ru: 'Честных отзывов', be: 'Чесных водгукаў', en: 'Honest reviews', pl: 'Szczerych recenzji', zh: '诚实的评价' },
  'home.stats.support': { ru: 'Поддержка', be: 'Падтрымка', en: 'Support', pl: 'Wsparcie', zh: '支持' },

  // Catalog page
  'catalog.title': { ru: 'Каталог', be: 'Каталог', en: 'Catalog', pl: 'Katalog', zh: '目录' },
  'catalog.priceRange': { ru: 'Ценовой диапазон:', be: 'Цэнавы дыяпазон:', en: 'Price range:', pl: 'Przedział cenowy:', zh: '价格范围：' },
  'catalog.search': { ru: 'Поиск...', be: 'Пошук...', en: 'Search...', pl: 'Szukaj...', zh: '搜索...' },
  'catalog.filterAll': { ru: 'Все', be: 'Усе', en: 'All', pl: 'Wszystkie', zh: '全部' },
  'catalog.filterBelarusian': { ru: 'Белорусская', be: 'Беларуская', en: 'Belarusian', pl: 'Białoruska', zh: '白俄罗斯' },
  'catalog.filterRestaurant': { ru: 'Рестораны', be: 'Рэстараны', en: 'Restaurants', pl: 'Restauracje', zh: '餐厅' },
  'catalog.filterCoffee': { ru: 'Кофе', be: 'Кава', en: 'Coffee', pl: 'Kawa', zh: '咖啡' },
  'catalog.filterBar': { ru: 'Бары', be: 'Бары', en: 'Bars', pl: 'Bary', zh: '酒吧' },
  'catalog.belarusianCuisine': { ru: 'Белорусская кухня', be: 'Беларуская кухня', en: 'Belarusian Cuisine', pl: 'Kuchnia białoruska', zh: '白俄罗斯美食' },
  'catalog.belarusianDesc': {
    ru: 'Современная национальная гастрономия — это не только классические драники и мачанка, но и переосмысленные локальные продукты. В нашей подборке собраны как заведения с аутентичной народной едой (например, культовые «Васильки»), так и места, где национальные мотивы встречаются с современным европейским подходом к крафту и стритфуду.',
    be: 'Сучасная нацыянальная гастраномія — гэта не толькі класічныя дранікі і мачанка, але і пераасмысленыя лакальныя прадукты. У нашай падборцы сабраны як ўстановы з аўтэнтычнай народнай едай (напрыклад, культавыя «Васількі»), так і месцы, дзе нацыянальныя матывы сустрэваюцца з сучасным еўрапейскім падыходам да крафту і стрытфуду.',
    en: 'Modern national gastronomy is not just classic draniki and machanka, but also reinterpreted local products. Our selection includes both venues with authentic folk cuisine (e.g., the iconic "Vasilki") and places where national motifs meet the modern European approach to craft and street food.',
    pl: 'Nowoczesna kuchnia narodowa to nie tylko klasyczne draniki i machanka, ale też na nowo interpretowane lokalne produkty. Nasza kolekcja obejmuje zarówno lokale z autentyczną kuchnią ludową (np. kultowe „Vasilki"), jak i miejsca, gdzie motywy narodowe spotykają się ze współczesnym europejskim podejściem do kraftu i street foodu.',
    zh: '现代民族美食不仅是经典的土豆饼和马昌卡，还有重新诠释的本地食材。我们的精选集合既包括提供正宗民间美食的场所（如标志性的"瓦西里基"），也包括民族元素与现代欧洲精酿和街头美食理念相融合的地方。'
  },
  'catalog.notFound': { ru: 'Ничего не найдено по вашему запросу', be: 'Нічога не знойдена па вашым запыце', en: 'Nothing found for your query', pl: 'Nic nie znaleziono dla Twojego zapytania', zh: '未找到匹配结果' },

  // About page
  'about.title': { ru: 'О проекте', be: 'Пра праект', en: 'About the project', pl: 'O projekcie', zh: '关于项目' },
  'about.quote': { ru: '«Минск Гастро» — это не просто каталог, это наш взгляд на кулинарную жизнь Минска. Мы верим, что каждое заведение имеет свою душу и историю.', be: '«Мінск Гастра» — гэта не проста каталог, гэта наш погляд на кулінарнае жыццё Мінска. Мы верым, што кожная ўстанова мае сваю душу і гісторыю.', en: '"Minsk Gastro" is not just a catalog, it\'s our view of the culinary life of Minsk. We believe every venue has its own soul and story.', pl: '"Minsk Gastro" to nie tylko katalog, to nasze spojrzenie na kulinarne życie Mińska. Wierzymy, że każde miejsce ma swoją duszę i historię.', zh: '"明斯克美食"不仅仅是一个目录，这是我们对明斯克美食生活的看法。我们相信每个场所都有自己的灵魂和故事。' },
  'about.desc': { ru: 'Мы начали этот проект в 2026 году как учебную инициативу, чтобы объединить современные веб-технологии и нашу страсть к качественному сервису.', be: 'Мы пачалі гэты праект у 2026 годзе як вучэбную ініцыятыву, каб аб\'яднаць сучасныя вэб-тэхналогіі і нашу страсць да якаснага сервісу.', en: 'We started this project in 2026 as a student initiative to combine modern web technologies with our passion for quality service.', pl: 'Rozpoczęliśmy ten projekt w 2026 roku jako inicjatywę studencką, aby połączyć nowoczesne technologie internetowe z naszą pasją do jakościowej obsługi.', zh: '我们于2026年启动了这个项目，作为学生倡议，将现代网络技术与我们对优质服务的热情相结合。' },
  'about.mission': { ru: 'Наша миссия', be: 'Наша місія', en: 'Our mission', pl: 'Nasza misja', zh: '我们的使命' },
  'about.missionDesc': { ru: 'Популяризация белорусской гастрономической культуры и поддержка локальных предпринимателей через удобный цифровой интерфейс.', be: 'Папулярызацыя беларускай гастранамічнай культуры і падтрымка лакальных прадпрымальнікаў праз зручны лічбавы інтэрфейс.', en: 'Promotion of Belarusian gastronomic culture and support for local entrepreneurs through a convenient digital interface.', pl: 'Popularyzacja białoruskiej kultury gastronomicznej i wspieranie lokalnych przedsiębiorców za pomocą wygodnego interfejsu cyfrowego.', zh: '推广白俄罗斯美食文化，通过便捷的数字界面支持本地企业家。' },
  'about.values': { ru: 'Наши ценности', be: 'Нашы каштоўнасці', en: 'Our values', pl: 'Nasze wartości', zh: '我们的价值观' },
  'about.valuesDesc': { ru: 'Честность отзывов, актуальность данных, своевременные рекомендации и ответы на интересующие вопросы.', be: 'Чеснасць водгукаў, актуальнасць даных, своечасовыя рэкамендацыі і адказы на цікавыя пытанні.', en: 'Honesty of reviews, data relevance, timely recommendations and answers to questions.', pl: 'Szczerość recenzji, aktualność danych, terminowe rekomendacje i odpowiedzi na pytania.', zh: '评价的真实性、数据的时效性、及时的推荐和问题解答。' },
  'about.team': { ru: 'Наша команда', be: 'Наша каманда', en: 'Our team', pl: 'Nasz zespół', zh: '我们的团队' },
  'about.teamDesc': { ru: 'Люди, которые делают весь мир лучше каждый день', be: 'Людзі, якія робяць увесь свет лепшым кожны дзень', en: 'People who make the world better every day', pl: 'Ludzie, którzy czynią świat lepszym każdego dnia', zh: '每天让世界变得更美好的人' },
  'about.writeTelegram': { ru: 'Написать в Telegram', be: 'Напісаць у Telegram', en: 'Write to Telegram', pl: 'Napisz na Telegram', zh: '发Telegram消息' },

  // Contacts page
  'contacts.title': { ru: 'Контакты', be: 'Кантакты', en: 'Contacts', pl: 'Kontakty', zh: '联系方式' },
  'contacts.desc': { ru: 'У вас есть предложение по сотрудничеству или вы нашли ошибку на сайте? Свяжитесь с нами любым удобным способом.', be: 'У вас ёсць прапанова па супрацоўніцтве або вы знайшлі памылку на сайце? Звяжыцеся з намі любым зручным спосабам.', en: 'Have a collaboration proposal or found an error on the site? Contact us in any convenient way.', pl: 'Masz propozycję współpracy lub znalazłeś błąd na stronie? Skontaktuj się z nami w dowolny dogodny sposób.', zh: '有合作提案或发现了网站上的错误？请通过任何方便的方式联系我们。' },
  'contacts.address': { ru: 'Адрес офиса', be: 'Адрас офіса', en: 'Office address', pl: 'Adres biura', zh: '办公室地址' },
  'contacts.phone': { ru: 'Телефон', be: 'Тэлефон', en: 'Phone', pl: 'Telefon', zh: '电话' },
  'contacts.instagram': { ru: 'Инстаграм', be: 'Інстаграм', en: 'Instagram', pl: 'Instagram', zh: 'Instagram' },
  'contacts.form.writeUs': { ru: 'Напишите нам', be: 'Напішыце нам', en: 'Write to us', pl: 'Napisz do nas', zh: '给我们留言' },
  'contacts.form.name': { ru: 'Имя', be: 'Імя', en: 'Name', pl: 'Imię', zh: '姓名' },
  'contacts.form.email': { ru: 'Email', be: 'Email', en: 'Email', pl: 'Email', zh: '电子邮件' },
  'contacts.form.subject': { ru: 'Тема', be: 'Тэма', en: 'Subject', pl: 'Temat', zh: '主题' },
  'contacts.form.message': { ru: 'Сообщение', be: 'Паведамленне', en: 'Message', pl: 'Wiadomość', zh: '留言' },
  'contacts.form.send': { ru: 'Отправить сообщение', be: 'Адправіць паведамленне', en: 'Send message', pl: 'Wyślij wiadomość', zh: '发送留言' },
  'contacts.form.sent': { ru: 'Сообщение успешно отправлено!', be: 'Паведамленне паспяхова адпраўлена!', en: 'Message sent successfully!', pl: 'Wiadomość wysłana pomyślnie!', zh: '留言发送成功！' },
  'contacts.form.sentDesc': { ru: 'Мы ответим вам на указанный email в течение суток.', be: 'Мы адкажам вам на ўказаны email на працягу сутак.', en: 'We will reply to your email within 24 hours.', pl: 'Odpowiemy na podany adres e-mail w ciągu 24 godzin.', zh: '我们将在24小时内回复您的电子邮件。' },

  // Support page
  'support.title': { ru: 'Служба поддержки', be: 'Служба падтрымкі', en: 'Support Service', pl: 'Obsługa klienta', zh: '客服中心' },
  'support.desc': { ru: 'Есть вопросы или предложения? Напишите нам, и мы ответим в ближайшее время.', be: 'Ёсць пытанні ці прапановы? Напішыце нам, і мы адкажам у бліжэйшы час.', en: 'Have questions or suggestions? Write to us and we\'ll respond shortly.', pl: 'Masz pytania lub sugestie? Napisz do nas, a wkrótce odpowiemy.', zh: '有问题或建议？请给我们留言，我们会尽快回复。' },
  'support.form.name': { ru: 'Ваше имя', be: 'Ваша імя', en: 'Your name', pl: 'Twoje imię', zh: '您的姓名' },
  'support.form.email': { ru: 'Email для связи', be: 'Email для сувязі', en: 'Contact email', pl: 'E-mail kontaktowy', zh: '联系邮箱' },
  'support.form.category': { ru: 'Категория вопроса', be: 'Катэгорыя пытання', en: 'Question category', pl: 'Kategoria pytania', zh: '问题类别' },
  'support.form.category.general': { ru: 'Общий вопрос', be: 'Агульнае пытанне', en: 'General question', pl: 'Pytanie ogólne', zh: '一般问题' },
  'support.form.category.booking': { ru: 'Проблема с бронированием', be: 'Праблема з браніраваннем', en: 'Booking problem', pl: 'Problem z rezerwacją', zh: '预订问题' },
  'support.form.category.venue': { ru: 'Предложение по заведениям', be: 'Прапанова па ўстановах', en: 'Venue suggestion', pl: 'Propozycja dotycząca lokalu', zh: '场所建议' },
  'support.form.category.technical': { ru: 'Техническая ошибка', be: 'Тэхнічная памылка', en: 'Technical error', pl: 'Błąd techniczny', zh: '技术错误' },
  'support.form.category.other': { ru: 'Другое', be: 'Іншае', en: 'Other', pl: 'Inne', zh: '其他' },
  'support.form.message': { ru: 'Сообщение', be: 'Паведамленне', en: 'Message', pl: 'Wiadomość', zh: '留言' },
  'support.form.messagePlaceholder': { ru: 'Расскажите нам подробнее...', be: 'Раскажыце нам падрабязней...', en: 'Tell us more...', pl: 'Opowiedz nam więcej...', zh: '请详细说明...' },
  'support.form.send': { ru: 'Отправить запрос', be: 'Адправіць запыт', en: 'Send request', pl: 'Wyślij zapytanie', zh: '提交请求' },
  'support.form.sent': { ru: 'Сообщение отправлено!', be: 'Паведамленне адпраўлена!', en: 'Message sent!', pl: 'Wiadomość wysłana!', zh: '留言已发送！' },
  'support.form.sentDesc': { ru: 'Мы получили ваш запрос и свяжемся с вами в течение 24 часов.', be: 'Мы атрымалі ваш запыт і звяжемся з вамі на працягу 24 гадзін.', en: 'We received your request and will contact you within 24 hours.', pl: 'Otrzymaliśmy Twoje zapytanie i skontaktujemy się w ciągu 24 godzin.', zh: '我们已收到您的请求，将在24小时内与您联系。' },
  'support.form.sendAnother': { ru: 'Отправить еще одно сообщение', be: 'Адправіць яшчэ адно паведамленне', en: 'Send another message', pl: 'Wyślij kolejną wiadomość', zh: '再发一条留言' },

  // Login page
  'login.title': { ru: 'С возвращением', be: 'Вяртанне', en: 'Welcome back', pl: 'Witaj z powrotem', zh: '欢迎回来' },
  'login.desc': { ru: 'Войдите, чтобы сохранять любимые места', be: 'Увайдзіце, каб захаваць любімыя месцы', en: 'Sign in to save your favorite places', pl: 'Zaloguj się, aby zapisywać ulubione miejsca', zh: '登录以保存您喜爱的地点' },
  'login.email': { ru: 'Email', be: 'Email', en: 'Email', pl: 'Email', zh: '电子邮件' },
  'login.password': { ru: 'Пароль', be: 'Пароль', en: 'Password', pl: 'Hasło', zh: '密码' },
  'login.forgot': { ru: 'Забыли?', be: 'Забылі?', en: 'Forgot?', pl: 'Zapomniałeś?', zh: '忘记密码？' },
  'login.submit': { ru: 'Войти', be: 'Увайсці', en: 'Sign in', pl: 'Zaloguj się', zh: '登录' },
  'login.noAccount': { ru: 'Нет аккаунта? ', be: 'Няма акаўнта? ', en: 'No account? ', pl: 'Nie masz konta? ', zh: '没有账号？ ' },
  'login.register': { ru: 'Зарегистрироваться', be: 'Зарэгістравацца', en: 'Sign up', pl: 'Zarejestruj się', zh: '注册' },
  'login.forgot.title': { ru: 'Сброс пароля', be: 'Скід пароля', en: 'Reset password', pl: 'Resetuj hasło', zh: '重置密码' },
  'login.forgot.step1': { ru: 'Введите email от вашего аккаунта', be: 'Увядзіце email ад вашага акаўнта', en: 'Enter your account email', pl: 'Wpisz e-mail swojego konta', zh: '请输入您账户的邮箱' },
  'login.forgot.step2': { ru: 'Введите код из письма и новый пароль', be: 'Увядзіце код з ліста і новы пароль', en: 'Enter the code from the email and new password', pl: 'Wpisz kod z e-maila i nowe hasło', zh: '输入邮件中的验证码和新密码' },
  'login.forgot.sendCode': { ru: 'Отправить код', be: 'Адправіць код', en: 'Send code', pl: 'Wyślij kod', zh: '发送验证码' },
  'login.forgot.codeFromEmail': { ru: 'Код из письма', be: 'Код з ліста', en: 'Code from email', pl: 'Kod z e-maila', zh: '邮件验证码' },
  'login.forgot.newPassword': { ru: 'Новый пароль', be: 'Новы пароль', en: 'New password', pl: 'Nowe hasło', zh: '新密码' },
  'login.forgot.confirmPassword': { ru: 'Подтвердите пароль', be: 'Пацвердзіце пароль', en: 'Confirm password', pl: 'Potwierdź hasło', zh: '确认密码' },
  'login.forgot.save': { ru: 'Сохранить пароль', be: 'Захаваць пароль', en: 'Save password', pl: 'Zapisz hasło', zh: '保存密码' },
  'login.forgot.backToLogin': { ru: 'Вернуться ко входу', be: 'Вярнуцца да ўваходу', en: 'Back to login', pl: 'Powrót do logowania', zh: '返回登录' },

  // Register page
  'register.title': { ru: 'Регистрация', be: 'Рэгістрацыя', en: 'Registration', pl: 'Rejestracja', zh: '注册' },
  'register.name': { ru: 'Ваше имя', be: 'Ваша імя', en: 'Your name', pl: 'Twoje imię', zh: '您的姓名' },
  'register.phone': { ru: 'Контактный телефон', be: 'Кантактны тэлефон', en: 'Contact phone', pl: 'Telefon kontaktowy', zh: '联系电话' },
  'register.phoneOptional': { ru: 'Необязательно', be: 'Неабавязкова', en: 'Optional', pl: 'Opcjonalnie', zh: '可选' },
  'register.password': { ru: 'Пароль', be: 'Пароль', en: 'Password', pl: 'Hasło', zh: '密码' },
  'register.submit': { ru: 'Создать аккаунт', be: 'Стварыць акаўнт', en: 'Create account', pl: 'Utwórz konto', zh: '创建账户' },
  'register.hasAccount': { ru: 'Уже есть аккаунт? ', be: 'Ужо ёсць акаўнт? ', en: 'Already have an account? ', pl: 'Masz już konto? ', zh: '已有账号？ ' },
  'register.login': { ru: 'Войти', be: 'Увайсці', en: 'Sign in', pl: 'Zaloguj się', zh: '登录' },
  'register.success': { ru: 'Регистрация успешна!', be: 'Рэгістрацыя паспяховая!', en: 'Registration successful!', pl: 'Rejestracja udana!', zh: '注册成功！' },
  'register.successGo': { ru: 'Войти', be: 'Увайсці', en: 'Sign in', pl: 'Zaloguj się', zh: '登录' },

  // Profile page
  'profile.favorites': { ru: 'Мое Избранное', be: 'Маё Абранае', en: 'My Favorites', pl: 'Moje ulubione', zh: '我的收藏' },
  'profile.bookings': { ru: 'Мои бронирования', be: 'Мае браніраванні', en: 'My Bookings', pl: 'Moje rezerwacje', zh: '我的预订' },
  'profile.settings': { ru: 'Настройки профиля', be: 'Налады профілю', en: 'Profile Settings', pl: 'Ustawienia profilu', zh: '个人设置' },
  'profile.logout': { ru: 'Выйти из аккаунта', be: 'Выйсці з акаўнта', en: 'Log out', pl: 'Wyloguj się', zh: '退出登录' },
  'profile.personalData': { ru: 'Личные данные', be: 'Асабістыя даныя', en: 'Personal Data', pl: 'Dane osobowe', zh: '个人资料' },
  'profile.emailLabel': { ru: 'Email (Логин)', be: 'Email (Лагін)', en: 'Email (Login)', pl: 'Email (Login)', zh: '电子邮件（登录名）' },
  'profile.nameLabel': { ru: 'Имя', be: 'Імя', en: 'Name', pl: 'Imię', zh: '姓名' },
  'profile.phoneLabel': { ru: 'Телефон', be: 'Тэлефон', en: 'Phone', pl: 'Telefon', zh: '电话' },
  'profile.save': { ru: 'Сохранить', be: 'Захаваць', en: 'Save', pl: 'Zapisz', zh: '保存' },
  'profile.cancel': { ru: 'Отмена', be: 'Адмена', en: 'Cancel', pl: 'Anuluj', zh: '取消' },
  'profile.edit': { ru: 'Изменить', be: 'Змяніць', en: 'Edit', pl: 'Edytuj', zh: '编辑' },
  'profile.avatar': { ru: 'Аватар', be: 'Аватар', en: 'Avatar', pl: 'Awatar', zh: '头像' },
  'profile.uploadPhoto': { ru: 'Загрузить фото', be: 'Загрузіць фота', en: 'Upload photo', pl: 'Załaduj zdjęcie', zh: '上传照片' },
  'profile.password': { ru: 'Пароль', be: 'Пароль', en: 'Password', pl: 'Hasło', zh: '密码' },
  'profile.changePassword': { ru: 'Изменить пароль', be: 'Змяніць пароль', en: 'Change password', pl: 'Zmień hasło', zh: '修改密码' },
  'profile.theme': { ru: 'Тема оформления', be: 'Тэма афармлення', en: 'Theme', pl: 'Motyw', zh: '主题' },
  'profile.dangerZone': { ru: 'Опасная зона', be: 'Небяспечная зона', en: 'Danger Zone', pl: 'Strefa niebezpieczna', zh: '危险区域' },
  'profile.deleteAccount': { ru: 'Удалить аккаунт', be: 'Выдаліць акаўнт', en: 'Delete account', pl: 'Usuń konto', zh: '删除账户' },
  'profile.delete': { ru: 'Удалить', be: 'Выдаліць', en: 'Delete', pl: 'Usuń', zh: '删除' },

  // Theme names
  'theme.classic': { ru: 'Классика', be: 'Класіка', en: 'Classic', pl: 'Klasyka', zh: '经典' },
  'theme.dark': { ru: 'Тёмная', be: 'Цёмная', en: 'Dark', pl: 'Ciemny', zh: '深色' },
  'theme.autumn': { ru: 'Осенняя', be: 'Асенняя', en: 'Autumn', pl: 'Jesienna', zh: '秋色' },
  'theme.ocean': { ru: 'Морская', be: 'Марская', en: 'Ocean', pl: 'Oceaniczny', zh: '海洋' },
  'theme.lavender': { ru: 'Лавандовая', be: 'Лавандавая', en: 'Lavender', pl: 'Lawendowy', zh: '薰衣草' },
  'theme.forest': { ru: 'Лесная', be: 'Лясная', en: 'Forest', pl: 'Leśny', zh: '森林' },
  'theme.waterfall': { ru: 'Водопад', be: 'Вадаспад', en: 'Waterfall', pl: 'Wodospad', zh: '瀑布' },

  // Site name
  'site.name': { ru: 'МИНСК ГАСТРО', be: 'МІНСК ГАСТРА', en: 'MINSK GASTRO', pl: 'MINSK GASTRO', zh: 'MINSK GASTRO' },

  // About page - team
  'about.nadezhda.role': { ru: 'Генеральный директор', be: 'Генеральны дырэктар', en: 'CEO', pl: 'Dyrektor generalny', zh: '首席执行官' },
  'about.nadezhda.desc': { ru: 'Основательница проекта. Знает каждый закоулок гастрономического Минска и лично дегустирует новые позиции в меню.', be: 'Заснавальніца праекта. Ведае кожны закоўнак гастранамічнага Мінска і асабіста дэгуствуе новыя пазіцыі ў меню.', en: 'Project founder. Knows every corner of Minsk\'s gastronomic scene and personally tastes every new menu item.', pl: 'Założycielka projektu. Zna każdy zakątek gastronomicznego Mińska i osobiście degustuje każdą nową pozycję w menu.', zh: '项目创始人。了解明斯克美食界的每个角落，亲自品尝每一道新菜品。' },
  'about.alexey.role': { ru: 'Заместитель директора', be: 'Намеснік дырэктара', en: 'Deputy Director', pl: 'Zastępca dyrektora', zh: '副总经理' },
  'about.alexey.desc': { ru: 'Отвечает за стратегическое развитие, партнерства с ресторанами и безупречную техническую работу платформы.', be: 'Адказвае за стратэгічнае развіццё, партнёрства з рэстаранамі і бездакорную тэхнічную работу платформы.', en: 'Responsible for strategic development, restaurant partnerships, and flawless platform operation.', pl: 'Odpowiada za rozwój strategiczny, partnerstwa z restauracjami i bezbłędną pracę platformy.', zh: '负责战略发展、餐厅合作以及平台的完美运营。' },

  // Worker names
  'about.nadezhda.name': { ru: 'Надежда Миланович', be: 'Надзея Мілановіч', en: 'Nadezhda Milanovich', pl: 'Nadieżda Milanowicz', zh: '娜杰日达·米兰诺维奇' },
  'about.alexey.name': { ru: 'Алексей Жданько', be: 'Аляксей Жданько', en: 'Alexey Zhdanko', pl: 'Aleksiej Żdańko', zh: '阿列克谢·日丹科' },

  // Contacts - office address
  'contacts.officeAddress': { ru: 'г. Минск, ул. Петруся Бровки, 14', be: 'г. Мінск, вул. Петруся Броўкі, 14', en: '14 Petrusya Brouki St, Minsk', pl: 'ul. Piotra Brovki 14, Mińsk', zh: '明斯克，彼得鲁斯·布罗夫基街14号' },
  'profile.savedPlaces': { ru: 'Сохраненные места', be: 'Захаваныя месцы', en: 'Saved Places', pl: 'Zapisane miejsca', zh: '已保存地点' },
  'profile.emptyFavorites': { ru: 'Пока тут пусто', be: 'Пакуль тут пуста', en: 'Nothing here yet', pl: 'Jeszcze nic tutaj nie ma', zh: '暂无收藏' },
  'profile.emptyFavoritesDesc': { ru: 'Вы еще не добавили ни одного заведения в избранное.', be: 'Вы яшчэ не дадалі ніводнай ўстановы ў абранае.', en: 'You haven\'t added any venues to favorites yet.', pl: 'Jeszcze nie dodałeś żadnych miejsc do ulubionych.', zh: '您还没有将任何场所添加到收藏。' },
  'profile.bookingsActive': { ru: 'Активные', be: 'Актыўныя', en: 'Active', pl: 'Aktywne', zh: '进行中' },
  'profile.bookingsHistory': { ru: 'История', be: 'Гісторыя', en: 'History', pl: 'Historia', zh: '历史' },
  'profile.noActiveBookings': { ru: 'Нет активных бронирований', be: 'Няма актыўных браніраванняў', en: 'No active bookings', pl: 'Brak aktywnych rezerwacji', zh: '没有进行中的预订' },
  'profile.emptyHistory': { ru: 'История пуста', be: 'Гісторыя пустая', en: 'History is empty', pl: 'Historia jest pusta', zh: '历史记录为空' },
  'profile.active': { ru: 'Активно', be: 'Актыўна', en: 'Active', pl: 'Aktywne', zh: '进行中' },
  'profile.cancelled': { ru: 'Отменено', be: 'Адменена', en: 'Cancelled', pl: 'Anulowane', zh: '已取消' },
  'profile.cancelBooking': { ru: 'Отменить', be: 'Адмяніць', en: 'Cancel', pl: 'Anuluj', zh: '取消' },
  'profile.cancelReasonTitle': { ru: 'Отмена бронирования', be: 'Адмена браніравання', en: 'Cancel Booking', pl: 'Anuluj rezerwację', zh: '取消预订' },
  'profile.cancelReasonDesc': { ru: 'Укажите причину отмены (необязательно):', be: 'Пазначце прычыну адмены (неабавязкова):', en: 'Specify the reason for cancellation (optional):', pl: 'Podaj powód anulowania (opcjonalnie):', zh: '注明取消原因（可选）：' },
  'profile.cancelConfirm': { ru: 'Да, отменить', be: 'Так, адмяніць', en: 'Yes, cancel', pl: 'Tak, anuluj', zh: '是，取消' },
  'profile.cancelKeep': { ru: 'Нет, оставить', be: 'Не, пакінуць', en: 'No, keep', pl: 'Nie, zostaw', zh: '不，保留' },

  // Footer
  'footer.desc': { ru: 'Ваш надежный гид по лучшим заведениям Минска. Мы любим свой город и его кухню.', be: 'Ваш надзейны гід па лепшых установах Мінска. Мы любім свой горад і яго кухню.', en: 'Your reliable guide to the best venues in Minsk. We love our city and its cuisine.', pl: 'Twój niezawodny przewodnik po najlepszych miejscach w Mińsku. Kochamy nasze miasto i jego kuchnię.', zh: '您可靠的明斯克最佳场所指南。我们热爱这座城市和它的美食。' },
  'footer.project': { ru: 'Проект', be: 'Праект', en: 'Project', pl: 'Projekt', zh: '项目' },
  'footer.help': { ru: 'Помощь', be: 'Дапамога', en: 'Help', pl: 'Pomoc', zh: '帮助' },
  'footer.socials': { ru: 'Соцсети', be: 'Сацсеткі', en: 'Socials', pl: 'Media społecznościowe', zh: '社交媒体' },
  'footer.support': { ru: 'Поддержка', be: 'Падтрымка', en: 'Support', pl: 'Wsparcie', zh: '支持' },
  'footer.privacy': { ru: 'Политика конфиденциальности', be: 'Палітыка канфідэнцыяльнасці', en: 'Privacy Policy', pl: 'Polityka prywatności', zh: '隐私政策' },
  'footer.copyright': { ru: 'Все права защищены. Разработано в учебных целях.', be: 'Усе правы абаронены. Распрацавана ў вучэбных мэтах.', en: 'All rights reserved. Developed for educational purposes.', pl: 'Wszelkie prawa zastrzeżone. Opracowane w celach edukacyjnych.', zh: '版权所有。为教育目的而开发。' },

  // Venue detail
  'venue.restaurant': { ru: 'Ресторан', be: 'Рэстаран', en: 'Restaurant', pl: 'Restauracja', zh: '餐厅' },
  'venue.coffee': { ru: 'Кофейня', be: 'Кавярня', en: 'Coffee Shop', pl: 'Kawiarnia', zh: '咖啡店' },
  'venue.bar': { ru: 'Бар', be: 'Бар', en: 'Bar', pl: 'Bar', zh: '酒吧' },
  'venue.cafe': { ru: 'Кафе', be: 'Кафэ', en: 'Cafe', pl: 'Kawiarnia', zh: '咖啡馆' },
  'venue.selectAddress': { ru: 'Выберите адрес:', be: 'Выберыце адрас:', en: 'Select address:', pl: 'Wybierz adres:', zh: '选择地址：' },
  'venue.book': { ru: 'Забронировать', be: 'Забраніраваць', en: 'Book', pl: 'Zarezerwuj', zh: '预订' },
  'venue.description': { ru: 'Описание', be: 'Апісанне', en: 'Description', pl: 'Opis', zh: '描述' },
  'venue.workHours': { ru: 'Режим работы', be: 'Рэжым працы', en: 'Working hours', pl: 'Godziny otwarcia', zh: '营业时间' },
  'venue.address': { ru: 'Адрес', be: 'Адрас', en: 'Address', pl: 'Adres', zh: '地址' },
  'venue.route': { ru: 'Маршрут', be: 'Маршрут', en: 'Route', pl: 'Trasa', zh: '路线' },
  'venue.features': { ru: 'Особенности', be: 'Асаблівасці', en: 'Features', pl: 'Cechy', zh: '特色' },
  'venue.interior': { ru: 'Интерьер', be: 'Інтэр\'ер', en: 'Interior', pl: 'Wnętrze', zh: '室内' },
  'venue.reviews': { ru: 'Отзывы гостей', be: 'Водгукі гасцей', en: 'Guest Reviews', pl: 'Opinie gości', zh: '客人评价' },
  'venue.notFound': { ru: 'Не найдено', be: 'Не знойдена', en: 'Not found', pl: 'Nie znaleziono', zh: '未找到' },

  // Booking form
  'booking.title': { ru: 'Бронирование', be: 'Браніраванне', en: 'Booking', pl: 'Rezerwacja', zh: '预订' },
  'booking.at': { ru: 'в', be: 'у', en: 'at', pl: 'w', zh: '在' },
  'booking.desc': { ru: 'Забронируйте столик прямо сейчас. Мы свяжемся с вами в течение 10 минут для подтверждения.', be: 'Забраніруйце столік прама цяпер. Мы звяжемся з вамі на працягу 10 хвілін для пацверджання.', en: 'Book a table right now. We\'ll contact you within 10 minutes for confirmation.', pl: 'Zarezerwuj stolik teraz. Skontaktujemy się z Tobą w ciągu 10 minut w celu potwierdzenia.', zh: '立即预订餐桌。我们将在10分钟内与您联系确认。' },
  'booking.allMinsk': { ru: 'Весь Минск', be: 'Увесь Мінск', en: 'All of Minsk', pl: 'Cały Mińsk', zh: '全明斯克' },
  'booking.guarantee': { ru: 'Гарантия столика', be: 'Гарантыя століка', en: 'Table guarantee', pl: 'Gwarancja stolika', zh: '餐桌保证' },
  'booking.name': { ru: 'Имя', be: 'Імя', en: 'Name', pl: 'Imię', zh: '姓名' },
  'booking.phone': { ru: 'Контактный телефон', be: 'Кантактны тэлефон', en: 'Contact phone', pl: 'Telefon kontaktowy', zh: '联系电话' },
  'booking.date': { ru: 'Дата', be: 'Дата', en: 'Date', pl: 'Data', zh: '日期' },
  'booking.guests': { ru: 'Гости', be: 'Госці', en: 'Guests', pl: 'Goście', zh: '客人' },
  'booking.guest1': { ru: 'гость', be: 'госць', en: 'guest', pl: 'gość', zh: '位客人' },
  'booking.guest2': { ru: 'гостя', be: 'госці', en: 'guests', pl: 'goście', zh: '位客人' },
  'booking.guest5': { ru: 'гостей', be: 'гасцей', en: 'guests', pl: ' gości', zh: '位客人' },
  'booking.wishes': { ru: 'Пожелания', be: 'Пажаданні', en: 'Wishes', pl: 'Życzenia', zh: '备注' },
  'booking.wishesPlaceholder': { ru: 'У окна, детский стульчик...', be: 'Ля акна, дзіцячы стульчык...', en: 'By the window, high chair...', pl: 'Przy oknie, krzesełko dla dziecka...', zh: '靠窗位置，儿童椅...' },
  'booking.submit': { ru: 'Отправить запрос', be: 'Адправіць запыт', en: 'Send request', pl: 'Wyślij zapytanie', zh: '提交请求' },
  'booking.sent': { ru: 'Заявка отправлена!', be: 'Заяўка адпраўлена!', en: 'Request sent!', pl: 'Zapytanie wysłane!', zh: '请求已发送！' },
  'booking.sentDesc': { ru: 'Ожидайте звонка на номер', be: 'Чакайце званок на нумар', en: 'Expect a call at', pl: 'Oczekuj połączenia na', zh: '请等待来电' },

  // Privacy page
  'privacy.title': { ru: 'Политика конфиденциальности', be: 'Палітыка канфідэнцыяльнасці', en: 'Privacy Policy', pl: 'Polityka prywatności', zh: '隐私政策' },
  'privacy.lastUpdate': { ru: 'Последнее обновление: 18 мая 2026 г.', be: 'Апошняе абнаўленне: 18 мая 2026 г.', en: 'Last update: May 18, 2026', pl: 'Ostatnia aktualizacja: 18 maja 2026 r.', zh: '最后更新：2026年5月18日' },
  'privacy.section1.title': { ru: '1. Сбор информации', be: '1. Збор інфармацыі', en: '1. Information Collection', pl: '1. Zbieranie informacji', zh: '1. 信息收集' },
  'privacy.section1.desc': { ru: 'Мы собираем информацию, которую вы предоставляете нам напрямую, например, при заполнении формы бронирования столика (имя, контактные данные, предпочтения). Также сайт автоматически собирает технические данные (IP-адрес, тип браузера) для обеспечения стабильной работы сервиса.', be: 'Мы збіраем інфармацыю, якую вы прадастаўляеце нам напрамую, напрыклад, пры запаўненні формы браніравання століка (імя, кантактныя даныя, перавагі). Таксама сайт аўтаматычна збірае тэхнічныя даныя (IP-адрес, тып браўзера) для забеспячэння стабільнай работы сервісу.', en: 'We collect information you provide directly, such as when filling out a table reservation form (name, contact details, preferences). The site also automatically collects technical data (IP address, browser type) to ensure stable service operation.', pl: 'Zbieramy informacje, które podajesz bezpośrednio, na przykład podczas wypełniania formularza rezerwacji stolika (imię, dane kontaktowe, preferencje). Strona automatycznie zbiera również dane techniczne (adres IP, typ przeglądarki) w celu zapewnienia stabilnej pracy serwisu.', zh: '我们收集您直接提供的信息，例如填写餐桌预订表单时（姓名、联系方式、偏好）。网站还会自动收集技术数据（IP地址、浏览器类型）以确保服务稳定运行。' },
  'privacy.section2.title': { ru: '2. Использование данных', be: '2. Выкарыстанне даных', en: '2. Data Usage', pl: '2. Wykorzystanie danych', zh: '2. 数据使用' },
  'privacy.section2.desc': { ru: 'Ваши данные используются исключительно для:', be: 'Вашы даныя выкарыстоўваюцца выключна для:', en: 'Your data is used exclusively for:', pl: 'Twoje dane są wykorzystywane wyłącznie do:', zh: '您的数据仅用于：' },
  'privacy.section2.point1': { ru: 'Обработки ваших запросов на бронирование.', be: 'Апрацоўкі вашых запытаў на браніраванне.', en: 'Processing your booking requests.', pl: 'Przetwarzania Twoich zapytań o rezerwację.', zh: '处理您的预订请求。' },
  'privacy.section2.point2': { ru: 'Улучшения качества нашего сервиса и UX-дизайна.', be: 'Палепшання якасці нашага сервісу і UX-дызайну.', en: 'Improving the quality of our service and UX design.', pl: 'Ulepszania jakości naszego serwisu i projektowania UX.', zh: '改进我们的服务质量和用户体验设计。' },
  'privacy.section2.point3': { ru: 'Связи с вами по поводу ваших заявок.', be: 'Сувязі з вамі адносна вашых заявак.', en: 'Contacting you regarding your requests.', pl: 'Kontaktowania się z Tobą w sprawie Twoich zapytań.', zh: '就您的请求与您联系。' },
  'privacy.section3.title': { ru: '3. Передача третьим лицам', be: '3. Перадача трэцім асобам', en: '3. Third-Party Disclosure', pl: '3. Ujawnianie stronom trzecim', zh: '3. 第三方披露' },
  'privacy.section3.desc': { ru: 'Мы не продаем и не передаем ваши персональные данные сторонним организациям, за исключением случаев, когда это необходимо для выполнения вашего запроса (например, передача данных ресторану для подтверждения бронирования).', be: 'Мы не прадаём і не перадаем вашыя персанальныя даныя баковым арганізацыям, за выключэннем выпадкаў, калі гэта неабходна для выканання вашага запыту (напрыклад, перадача даных рэстарану для пацверджання браніравання).', en: 'We do not sell or transfer your personal data to third-party organizations, except when necessary to fulfill your request (e.g., sharing data with the restaurant to confirm a reservation).', pl: 'Nie sprzedajemy ani nie przekazujemy Twoich danych osobowych stronom trzecim, z wyjątkiem przypadków, gdy jest to niezbędne do realizacji Twojego zapytania (np. przekazanie danych restauracji w celu potwierdzenia rezerwacji).', zh: '我们不会出售或向第三方组织转让您的个人数据，除非需要满足您的请求（例如，向餐厅分享数据以确认预订）。' },
  'privacy.section4.title': { ru: '4. Защита информации', be: '4. Абарона інфармацыі', en: '4. Information Protection', pl: '4. Ochrona informacji', zh: '4. 信息保护' },
  'privacy.section4.desc': { ru: 'Мы принимаем все необходимые технические меры для защиты ваших данных от несанкционированного доступа, изменения или уничтожения.', be: 'Мы прымаем усе неабходныя тэхнічныя меры для абароны вашых даных ад несанкцыянаванага доступу, змены або знішчэння.', en: 'We take all necessary technical measures to protect your data from unauthorized access, modification, or destruction.', pl: 'Podjęliśmy wszelkie niezbędne środki techniczne w celu ochrony Twoich danych przed nieautoryzowanym dostępem, modyfikacją lub zniszczeniem.', zh: '我们采取一切必要的技术措施来保护您的数据免受未经授权的访问、修改或销毁。' },
  'privacy.section5.title': { ru: '5. Ваши права', be: '5. Вашы правы', en: '5. Your Rights', pl: '5. Twoje prawa', zh: '5. 您的权利' },
  'privacy.section5.desc': { ru: 'Вы имеете право запросить удаление ваших данных или изменение предоставленной информации, связавшись с нами по адресу hello@minskgastro.by.', be: 'Вы маеце права запрасіць выдаленне вашых даных або змену прадстаўленай інфармацыі, звязаўшыся з намі па адрасе hello@minskgastro.by.', en: 'You have the right to request deletion of your data or modification of the provided information by contacting us at hello@minskgastro.by.', pl: 'Masz prawo zażądać usunięcia swoich danych lub zmiany podanych informacji, kontaktując się z nami pod adresem hello@minskgastro.by.', zh: '您有权要求删除您的数据或修改所提供的信息，请通过 hello@minskgastro.by 联系我们。' },

  // NotFound page
  'notFound.title': { ru: 'Страница не найдена', be: 'Старонка не знойдзена', en: 'Page not found', pl: 'Strona nie znaleziona', zh: '页面未找到' },
  'notFound.desc': { ru: 'Кажется, вы забрели не туда. Возможно, заведение переехало, или ссылка устарела.', be: 'Здаецца, вы забрэлі не туды. Магчыма, ўстанова пераехалася, або спасылка састарэла.', en: 'It seems you\'ve wandered off. Perhaps the venue has moved, or the link is outdated.', pl: 'Wygląda na to, że zabłądziłeś. Być może lokal się przeniósł lub link jest nieaktualny.', zh: '看起来您迷路了。可能该场所已搬迁，或者链接已过期。' },
  'notFound.goHome': { ru: 'На главную', be: 'На галоўную', en: 'Go Home', pl: 'Na stronę główną', zh: '返回首页' },

  // VenueCard
  'venueCard.more': { ru: 'Подробнее', be: 'Падрабязнасці', en: 'Details', pl: 'Szczegóły', zh: '详情' },

  // Language switcher
  'lang.ru': { ru: 'Русский', be: 'Руская', en: 'Russian', pl: 'Rosyjski', zh: '俄语' },
  'lang.be': { ru: 'Беларуский', be: 'Беларуская', en: 'Belarusian', pl: 'Białoruski', zh: '白俄罗斯语' },
  'lang.en': { ru: 'Английский', be: 'Англійская', en: 'English', pl: 'Angielski', zh: '英语' },
  'lang.pl': { ru: 'Польский', be: 'Польская', en: 'Polish', pl: 'Polski', zh: '波兰语' },
  'lang.zh': { ru: 'Китайский', be: 'Кітайская', en: 'Chinese', pl: 'Chiński', zh: '中文' },

  // Common
  'common.or': { ru: 'или', be: 'або', en: 'or', pl: 'lub', zh: '或' },
  'common.notSpecified': { ru: 'Не указан', be: 'Не пазначана', en: 'Not specified', pl: 'Nie podano', zh: '未填写' },
  'common.saveSuccess': { ru: 'успешно изменено!', be: 'паспяхова зменена!', en: 'successfully changed!', pl: 'pomyślnie zmieniono!', zh: '修改成功！' },
  'common.min6chars': { ru: 'Минимум 6 символов', be: 'Мінімум 6 сімвалаў', en: 'Minimum 6 characters', pl: 'Minimum 6 znaków', zh: '最少6个字符' },
  'common.repeatPassword': { ru: 'Повторите новый пароль', be: 'Паўтарыце новы пароль', en: 'Repeat new password', pl: 'Powtórz nowe hasło', zh: '重复新密码' },
  'common.confirm': { ru: 'Подтвердить', be: 'Пацвердзіць', en: 'Confirm', pl: 'Potwierdź', zh: '确认' },
  'common.back': { ru: 'Назад', be: 'Назад', en: 'Back', pl: 'Wstecz', zh: '返回' },
  'common.codeSentTo': { ru: 'Код отправлен на', be: 'Код адпраўлены на', en: 'Code sent to', pl: 'Kod wysłany na', zh: '验证码已发送至' },
  'common.sendCode': { ru: 'Отправить код', be: 'Адправіць код', en: 'Send code', pl: 'Wyślij kod', zh: '发送验证码' },
  'common.codeFromEmail': { ru: 'Код из письма', be: 'Код з ліста', en: 'Code from email', pl: 'Kod z e-maila', zh: '邮件验证码' },
  'common.newPassword': { ru: 'Новый пароль', be: 'Новы пароль', en: 'New password', pl: 'Nowe hasło', zh: '新密码' },
  'common.confirmPassword': { ru: 'Подтвердите пароль', be: 'Пацвердзіце пароль', en: 'Confirm password', pl: 'Potwierdź hasło', zh: '确认密码' },
  'common.savePassword': { ru: 'Сохранить пароль', be: 'Захаваць пароль', en: 'Save password', pl: 'Zapisz hasło', zh: '保存密码' },
  'common.confirmCode': { ru: 'Код из письма', be: 'Код з ліста', en: 'Code from email', pl: 'Kod z e-maila', zh: '邮件验证码' },
  'common.save': { ru: 'Сохранить', be: 'Захаваць', en: 'Save', pl: 'Zapisz', zh: '保存' },
  'common.cancel': { ru: 'Отмена', be: 'Адмена', en: 'Cancel', pl: 'Anuluj', zh: '取消' },
  'common.edit': { ru: 'Изменить', be: 'Змяніць', en: 'Edit', pl: 'Edytuj', zh: '编辑' },
  'common.delete': { ru: 'Удалить', be: 'Выдаліць', en: 'Delete', pl: 'Usuń', zh: '删除' },
  'common.uploadPhoto': { ru: 'Загрузить фото', be: 'Загрузіць фота', en: 'Upload photo', pl: 'Załaduj zdjęcie', zh: '上传照片' },
  'common.backToLogin': { ru: 'Вернуться ко входу', be: 'Вярнуцца да ўваходу', en: 'Back to login', pl: 'Powrót do logowania', zh: '返回登录' },

  // VenueCard
  'venueCard.type.restaurant': { ru: 'Ресторан', be: 'Рэстаран', en: 'Restaurant', pl: 'Restauracja', zh: '餐厅' },
  'venueCard.type.coffee': { ru: 'Кофейня', be: 'Кавярня', en: 'Coffee Shop', pl: 'Kawiarnia', zh: '咖啡店' },
  'venueCard.type.bar': { ru: 'Бар', be: 'Бар', en: 'Bar', pl: 'Bar', zh: '酒吧' },
  'venueCard.type.cafe': { ru: 'Кафе', be: 'Кафэ', en: 'Cafe', pl: 'Kawiarnia', zh: '咖啡馆' },

  // ========== VENUE DESCRIPTIONS ==========
  'venue.contrast.desc': {
    ru: 'Контраст атмосферы спокойствия с бешеными ритмами города чутко улавливается уже с порога. Интерьер ресторана Contrast (Контраст) окутывает уютом, где гостям удобно провести деловую встречу, заглянуть на семейный завтрак или запланировать свидание на вечер. Все это приправлено главными ценностями заведения: простой понятной едой, безупречным сервисом и честностью в отношениях с клиентами во всем.',
    be: 'Кантраст атмасферы спакою з бязмернымі рытмамі горада адчуваецца ўжо з парога. Інтэр\'ер рэстарана Contrast атуляе ўтульнасцю, дзе гасцём зручна правесці дзелавую сустрэчу, зайсці на сямейны сняданак або запланаваць спатканне на вечар. Усё гэта прыпраўлена галоўнымі каштоўнасцямі ўстановы: простай зразумелай ежай, бездакорным сэрвісам і шчырасцю ў адносінах з кліентамі ва ўсім.',
    en: 'The contrast of tranquility with the city\'s bustling rhythms is felt right from the doorstep. The restaurant\'s interior wraps you in comfort, making it perfect for a business meeting, family brunch, or evening date. All complemented by the venue\'s core values: simple understandable food, impeccable service, and honest relationships with clients.',
    pl: 'Kontrast spokoju z szaleńczymi rytmami miasta wyczuwalny jest już od progu. Wnętrze restauracji otula przytulnością, gdzie goście mogą wygodnie odbyć spotkanie biznesowe, wpaść na rodzinne śniadanie lub zaplanować wieczorną randkę. Wszystko doprawione głównymi wartościami miejsca: prostą, zrozumiałą kuchnią, nienaganną obsługą i uczciwością w relacjach z klientami.',
    zh: '宁静与城市喧嚣节奏的反差从门口就能感受到。餐厅内部温馨舒适，非常适合商务会议、家庭早午餐或晚间约会。一切都以场所的核心价值为佐料：简单易懂的美食、无可挑剔的服务以及与客户之间真诚的关系。'
  },
  'venue.le-pigeon.desc': {
    ru: 'Светлая и уютная кофейня в центре города с современным лаконичным интерьером, мягкими креслами и панорамными окнами. Фирменное заведение славится самой большой линейкой сырников в городе, вкусными завтраками и отличным кофе (классика, воронка, авторские и сезонные напитки).',
    be: 'Светлая і ўтульная кавярня ў цэнтры горада з сучасным лаканічным інтэр\'ерам, мяккімі крэсламі і панарамнымі вокнамі. Фірмовая ўстанова славіцца самай вялікай лінейкай сырнікоў у горадзе, смачнымі сняданкамі і выдатнай кавай (класіка, варонка, аўтарскія і сезонныя напоі).',
    en: 'A bright and cozy coffee shop in the city center with a modern minimalist interior, soft armchairs, and panoramic windows. This signature venue is famous for the city\'s largest selection of syrniki (cheese pancakes), delicious breakfasts, and excellent coffee (classic, pour-over, signature, and seasonal drinks).',
    pl: 'Jasna i przytulna kawiarnia w centrum miasta z nowoczesnym minimalistycznym wnętrzem, miękkimi fotelami i panoramicznymi oknami. To firmowe miejsce słynie z największej w mieście oferty syrników (racuchów serowych), pysznych śniadań i doskonałej kawy (klasyka, pour-over, autorskie i sezonowe napoje).',
    zh: '位于市中心的明亮舒适咖啡店，拥有现代简约内饰、柔软扶手椅和全景窗户。这家招牌店以城市最大的奶酪饼（syrniki）系列、美味早餐和优质咖啡（经典、手冲、特调和季节性饮品）而闻名。'
  },
  'venue.ember.desc': {
    ru: 'Изысканный винный ресторан и бар на 7-м этаже отеля DoubleTree by Hilton в центре Минска. Заведение специализируется на стейках сухой выдержки, свежих морепродуктах и авторской кухне, предлагая одну из самых богатых винотек в городе.',
    be: 'Вытанкаваны вінны рэстаран і бар на 7-м паверсе гатэля DoubleTree by Hilton у цэнтры Мінска. Установа спецыялізуецца на стейках сухой вытрымкі, свежых марепрадуктах і аўтарскай кухні, прапаноўвуючы адну з самых багатых вінатэк у горадзе.',
    en: 'An exquisite wine restaurant and bar on the 7th floor of the DoubleTree by Hilton hotel in central Minsk. The venue specializes in dry-aged steaks, fresh seafood, and signature cuisine, offering one of the city\'s richest wine collections.',
    pl: 'Wykwintna restauracja winiarska i bar na 7. piętrze hotelu DoubleTree by Hilton w centrum Mińska. Miejsce specjalizuje się w stekach dojrzewanych na sucho, świeżych owocach morza i autorskiej kuchni, oferując jedno z najbogatszych piwnic win w mieście.',
    zh: '位于明斯克市中心DoubleTree by Hilton酒店7楼的精致葡萄酒餐厅和酒吧。该场所专营干式熟成牛排、新鲜海鲜和特色料理，提供城市最丰富的葡萄酒收藏之一。'
  },
  'venue.lidbeer.desc': {
    ru: 'Сеть популярных заведений в Минске, где подают знаменитое пиво. Меню включает классические закуски (начос, сырные палочки, крылья баффало, мясные сеты), а интерьер выполнен в формате традиционного паба.',
    be: 'Сетка папулярных устаноў у Мінску, дзе падаюць знакамітае піва. Меню ўключае класічныя закускі (начос, сыраныя палачкі, крылы баффала, мясныя сеты), а інтэр\'ер выкананы ў фармаце традыцыйнага паба.',
    en: 'A popular chain of venues in Minsk serving famous beer. The menu includes classic snacks (nachos, cheese sticks, buffalo wings, meat sets), and the interior is designed in a traditional pub format.',
    pl: 'Popularna sieć lokali w Mińsku serwująca słynne piwo. Menu obejmuje klasyczne przekąski (nachosy, paluszki serowe, skrzydełka buffalo, zestawy mięsne), a wnętrze urządzone jest w formacie tradycyjnego pubu.',
    zh: '明斯克著名的连锁酒吧，供应著名的啤酒。菜单包括经典小吃（墨西哥玉米片、芝士棒、水牛城鸡翅、肉类套餐），内饰采用传统酒吧风格。'
  },
  'venue.leone.desc': {
    ru: 'Стильный аперитиво-бар на главной барной улице города. Заведение пропитано философией гедонизма, предлагая гостям расслабленную атмосферу, авторские напитки и эстетику ночной гастрономии.',
    be: 'Стыльны апетыўна-бар на галоўнай барнай вуліцы горада. Установа прасякнута філасофіяй геданізму, прапаноўваючы гасцём расслабленую атмасферу, аўтарскія напоі і эстэтыку начной гастраноміі.',
    en: 'A stylish aperitivo bar on the city\'s main bar street. The venue is imbued with hedonism philosophy, offering guests a relaxed atmosphere, signature drinks, and the aesthetics of nightlife gastronomy.',
    pl: 'Stylowy bar aperitivo na głównej ulicy barowej miasta. Miejsce przesiąknięte filozofią hedonizmu, oferujące gościom relaksującą atmosferę, autorskie napoje i estetykę nocnej gastronomii.',
    zh: '位于城市主要酒吧街的时尚开胃酒吧。该场所融入了享乐主义哲学，为客人提供轻松的氛围、特色饮品和夜生活美食美学。'
  },
  'venue.the-odi.desc': {
    ru: 'Популярный ресторан и кондитерская в самом сердце Минска. Заведение славится собственной пекарней, натуральным крафтовым мороженым и классическими европейскими десертами в авторской интерпретации, а также предлагает полноценное меню европейской кухни.',
    be: 'Папулярны рэстаран і кандытэрская ў самым сэрцы Мінска. Установа славіцца ўласнай пякарняй, натуральным крафтовым марожаным і класічнымі еўрапейскімі дэсертамі ў аўтарскай інтэрпрэтацыі, а таксама прапаноўвае поўнацэннае меню еўрапейскай кухні.',
    en: 'A popular restaurant and confectionery in the heart of Minsk. The venue is famous for its own bakery, natural craft ice cream, and classic European desserts with a signature twist, as well as a full European cuisine menu.',
    pl: 'Popularna restauracja i cukiernia w sercu Mińska. Miejsce słynie z własnej piekarni, naturalnych rzemieślniczych lodów i klasycznych europejskich deserów autorskiej interpretacji, a także oferuje pełne menu kuchni europejskiej.',
    zh: '位于明斯克心脏地带的热门餐厅和糕点店。该场所以其自有烘焙坊、天然手工冰淇淋和经典欧洲甜点的创意演绎而闻名，同时提供完整的欧洲美食菜单。'
  },
  'venue.pellegrino.desc': {
    ru: 'Пространство оформлено в стиле модных итальянских эспрессо-баров и ресторанов: обилие зелени, эстетичные детали, подходящие для фото, и просторная, уютная терраса. Это место позиционирует себя как ресторан для семейных обедов, встреч с друзьями и вечерних свиданий. Меню сфокусировано на классических итальянских рецептах.',
    be: 'Прастора аформлена ў стылі модных італьянскіх эспрэса-бараў і рэстаранаў: багацце зеляні, эстэтычныя дэталі, прыдатныя для фота, і прасторная, ўтульная тэраса. Гэта месца пазіцыянуе сябе як рэстаран для сямейных абедаў, сустрэч з сябрамі і вячэрніх спатканняў. Меню сфакусавана на класічных італьянскіх рэцэптах.',
    en: 'The space is designed in the style of trendy Italian espresso bars and restaurants: abundant greenery, aesthetic details perfect for photos, and a spacious, cozy terrace. This place positions itself as a restaurant for family lunches, friend gatherings, and evening dates. The menu focuses on classic Italian recipes.',
    pl: 'Przestrzeń urządzona w stylu modnych włoskich barów espresso i restauracji: obfitość zieleni, estetyczne detale idealne do zdjęć i przestronny, przytulny taras. Miejsce pozycjonuje się jako restauracja na rodzinne obiady, spotkania z przyjaciółmi i wieczorne randki. Menu skupia się na klasycznych włoskich przepisach.',
    zh: '空间设计采用时尚意大利浓缩咖啡吧和餐厅风格：丰富的绿植、适合拍照的美学细节以及宽敞舒适的露台。这里定位为家庭午餐、朋友聚会和晚间约会的餐厅。菜单以经典意大利食谱为重点。'
  },
  'venue.lovemyrr.desc': {
    ru: 'Это сеть эстетичных кофеен и цветочных мастерских в Минске, дополненная одноименным брендом женской одежды. Проект основан семейной парой (Сашей и Лизой) и строится на любви к кофе, цветам и нежному, уютному стилю жизни.',
    be: 'Гэта сетка эстэтычных кавярняў і кветкавых майстэрняў у Мінску, дапоўненая аднайменным брэндам жаночай адзення. Праект заснаваны сямейнай парай (Сашай і Лізай) і будуецца на любові да кавы, кветак і нежнага, ўтульнага стылю жыцця.',
    en: 'A network of aesthetic coffee shops and floral studios in Minsk, complemented by a women\'s clothing brand of the same name. The project was founded by a couple (Sasha and Lisa) and is built on a love for coffee, flowers, and a gentle, cozy lifestyle.',
    pl: 'Sieć estetycznych kawiarni i pracowni florystycznych w Mińsku, uzupełniona marką odzieży damskiej o tej samej nazwie. Projekt założony przez parę (Saszę i Lisę) oparty jest na miłości do kawy, kwiatów i delikatnego, przytulnego stylu życia.',
    zh: '明斯克的美学咖啡店和花艺工作室网络，配有同名女装品牌。该项目由一对夫妇（Sasha和Lisa）创立，建立在对咖啡、花卉和温柔舒适生活方式的热爱之上。'
  },
  'venue.malevich.desc': {
    ru: 'Стильный ресторан авторской кухни. Заведение названо в честь знаменитого художника-авангардиста и предлагает гостям утонченную атмосферу, смелые фьюжн-решения от шеф-поваров и блюда из свежих морепродуктов.',
    be: 'Стыльны рэстаран аўтарскай кухні. Установа названа ў гонар знакамітага мастака-авангардыста і прапаноўвае гасцём утончаную атмасферу, смелыя фьюжн-рашэнні ад шэф-повараў і стравы з свежых марепрадуктаў.',
    en: 'A stylish signature cuisine restaurant. The venue is named after the famous avant-garde artist and offers guests a refined atmosphere, bold fusion solutions from chefs, and dishes made from fresh seafood.',
    pl: 'Stylowa restauracja kuchni autorskiej. Miejsce nazwane na cześć słynnego artysty awangardowego oferuje gościom wyrafinowaną atmosferę, odważne rozwiązania fusion od szefów kuchni i dania ze świeżych owoców morza.',
    zh: '时尚的特色料理餐厅。该场所以著名前卫艺术家命名，为客人提供精致的氛围、厨师的大胆融合创意以及新鲜海鲜料理。'
  },
  'venue.mesto-pro-edu.desc': {
    ru: 'Заведение с блюдами высокой кухни для ценителей вкусной еды. Концепция кафе - "кухня родных продуктов". Здесь готовят необычные авторские блюда из локальных продуктов. В заведении представлен широкий перечень вина, авторских коктейлей и напитков собственного приготовления.',
    be: 'Установа са стравамі высокай кухні для цаніцеляў смачнай ежы. Канцэпцыя кафе - "кухня родных прадуктаў". Тут рыхтуюць незвычайныя аўтарскія стравы з лакальных прадуктаў. ва ўстанове прадстаўлены шырокі пералік віна, аўтарскіх кактэйляў і напояў уласнага прыгатавання.',
    en: 'A fine dining venue for food connoisseurs. The café concept is "cuisine of native products." They prepare unique signature dishes from local ingredients. The venue offers a wide selection of wines, signature cocktails, and homemade drinks.',
    pl: 'Miejsce haute cuisine dla koneserów dobrego jedzenia. Koncepcja kawiarni to "kuchnia rodzimych produktów." Przygotowują tu wyjątkowe dania autorskie z lokalnych składników. Miejsce oferuje szeroki wybór win, autorskich koktajli i napojów własnej produkcji.',
    zh: '为美食鉴赏家提供的高级料理场所。咖啡馆的理念是"本地食材的料理"。这里用当地食材制作独特的创意菜品。场所提供丰富的葡萄酒、特色鸡尾酒和自制饮品选择。'
  },
  'venue.roast.desc': {
    ru: 'Семейный проект свежей обжарки, специализирующийся на спешелти-кофе. В меню представлены как классические напитки, так и альтернатива (воронка), а также авторские десерты. Атмосфера заведений отличается уютом и концепцией dog-friendly.',
    be: 'Сямейны праект свежай абжаркі, які спецыялізуецца на спэшэлці-каве. У меню прадстаўлены як класічныя напоі, так і альтэрнатыва (варонка), а таксама аўтарскія дэсэрты. Атмасфера ўстаноў адрозніваецца ўтульнасцю і канцэпцыяй dog-friendly.',
    en: 'A family-run specialty coffee roastery project. The menu features both classic drinks and alternative pour-over coffee, as well as signature desserts. The venues are known for their cozy atmosphere and dog-friendly concept.',
    pl: 'Rodzinny projekt palarni kawy specjalizującej się w kawie speciality. W menu znajdują się zarówno klasyczne napoje, jak i alternatywne pour-over, a także autorskie desery. Lokale wyróżniają się przytulną atmosferą i koncepcją przyjazną psom.',
    zh: '一个专注于精品咖啡的家庭烘焙项目。菜单提供经典饮品和手冲替代咖啡，以及特色甜点。这些场所以其舒适的氛围和狗狗友好理念而闻名。'
  },
  'venue.vasilki.desc': {
    ru: 'Рестораны народной кухни «Васiлькi» ежедневно встречают Гостей белорусским радушием и гостеприимством, ведь это не только место, где можно вкусно поесть, но и то самое место, где можно отдохнуть душой и провести время в компании близких.',
    be: 'Рэстараны народнай кухні «Васiлькi» штодня сустракаюць Гасцей беларускай шчырасцю і гасціннасцю, бо гэта не толькі месца, дзе можна смачна паясці, але і тое самае месца, дзе можна адпачыць душой і правесці час у кампаніі блізкіх.',
    en: 'The "Vasilki" folk cuisine restaurants welcome guests daily with Belarusian warmth and hospitality. It\'s not just a place to enjoy delicious food, but also a place to rest your soul and spend time with loved ones.',
    pl: 'Restauracje kuchni ludowej „Vasilki" codziennie witają gości białoruską gościnnością i życzliwością, ponieważ to nie tylko miejsce, gdzie można smacznie zjeść, ale też miejsce, gdzie można odpocząć duchem i spędzić czas w towarzystwie bliskich.',
    zh: '"Васильки"民族美食餐厅每天以白俄罗斯的热情和好客迎接客人。这里不仅是享用美味佳肴的地方，更是一个放松心灵、与亲人共度时光的场所。'
  },
  'venue.zerno.desc': {
    ru: 'Все кофейни - это уютные и атмосферные места, в которых можно отлично провести время со всей семьей, даже со своими четвероногими друзьями, ведь наши кофейни dog-friendly. Интерьеры всех кофеен выполнены в разных дизайнерских стилистических решениях и с своей уникальной атмосферой.',
    be: 'Усе кавярні - гэта ўтульныя і атмасферныя месцы, у якіх можа выдатна правесці час з усёй сям\'ёй, нават са сваімі чатырохногімі сябрамі, бо нашы кавярні dog-friendly. Інтэр\'еры ўсіх кавярняў выкананы ў розных дызайнерскіх стылях і з сваёй унікальнай атмасферай.',
    en: 'All coffee shops are cozy and atmospheric places where you can spend great time with the whole family, even with your four-legged friends, as our cafés are dog-friendly. All coffee shop interiors feature different designer styles with their own unique atmosphere.',
    pl: 'Wszystkie kawiarnie to przytulne i atmosferyczne miejsca, w których można świetnie spędzić czas z całą rodziną, nawet z czworonożnymi przyjaciółmi, ponieważ nasze kawiarnie są przyjazne psom. Wnętrza wszystkich kawiarni utrzymane są w różnych stylach designerskich z własną unikalną atmosferą.',
    zh: '所有咖啡店都是温馨且有氛围的地方，您可以与全家人（甚至包括四条腿的朋友）共度美好时光，因为我们的咖啡店对狗狗友好。所有咖啡店的室内设计采用不同的设计师风格，各具独特氛围。'
  },
  'venue.varka.desc': {
    ru: 'Популярная белорусская сеть кофеен в Минске и других городах страны, основанная предпринимателем и блогером Никитой Нестеровым. Заведения известны стильным дизайном, атмосферой уюта, демократичными ценами и форматом «кофе с собой».',
    be: 'Папулярная беларуская сетка кавярняў у Мінску і іншых гарадах краіны, заснаваная прадпрымальнікам і блогерам Нікітам Нестэравым. Установы вядомыя стыльным дызайнам, атмасферай утульнасці, дэмакратычнымі цэнамі і фарматам «кава з сабой».',
    en: 'A popular Belarusian coffee chain in Minsk and other cities, founded by entrepreneur and blogger Nikita Nesterov. The venues are known for stylish design, cozy atmosphere, affordable prices, and the "coffee to-go" format.',
    pl: 'Popularna białoruska sieć kawiarni w Mińsku i innych miastach kraju, założona przez przedsiębiorcę i blogera Nikitę Nesterowa. Lokale znane są ze stylowego designu, przytulnej atmosfery, przystępnych cen i formatu "kawa na wynos".',
    zh: '由企业家和博主Nikita Nesterov创立的白俄罗斯知名连锁咖啡品牌，在明斯克及国内其他城市设有分店。这些场所以时尚设计、温馨氛围、亲民价格和"外带咖啡"模式而闻名。'
  },
  'venue.zavod.desc': {
    ru: 'Гастропаб в центре города, с отдельным караоке-залом, круглогодичной террасой и двумя VIP-комнатами. Аутентичная атмосфера, превосходная кухня, правильные напитки, специально сваренная линейка разливного фирменного пива, ежедневная живая музыка.',
    be: 'Гастрапаб у цэнтры горада, з асобным караоке-залам, круглагоднічнай тэрасай і двума VIP-пакоямі. Аўтэнтычная атмасфера, выдатная кухня, правільныя напоі, спецыяльна звараная лінейка разліўнога фірмовага піва, штодзённая жывая музыка.',
    en: 'A gastropub in the city center with a separate karaoke hall, year-round terrace, and two VIP rooms. Authentic atmosphere, excellent cuisine, proper drinks, a specially brewed lineup of draft signature beer, and daily live music.',
    pl: 'Gastropub w centrum miasta z osobną salą karaoke, całorocznym tarasem i dwoma pokojami VIP. Autentyczna atmosfera, doskonała kuchnia, odpowiednie napoje, specjalnie warzona linia piwa lanego firmowego i codzienna muzyka na żywo.',
    zh: '位于市中心的美食酒吧，设有独立卡拉OK厅、全年开放的露台和两间VIP室。正宗氛围、卓越美食、精选饮品、特制招牌生啤以及每日现场音乐。'
  },

  // ========== VENUE FEATURES (key = venue id + branch index) ==========
  'venue.contrast.f0': { ru: 'Wifi', be: 'Wifi', en: 'Wifi', pl: 'Wifi', zh: '无线网络' },
  'venue.contrast.f1': { ru: 'Оплата картой', be: 'Аплата картай', en: 'Card payment', pl: 'Płatność kartą', zh: '刷卡支付' },
  'venue.contrast.f2': { ru: 'Завтраки', be: 'Сняданкі', en: 'Breakfasts', pl: 'Śniadania', zh: '早餐' },
  'venue.contrast.f3': { ru: 'Вегетарианские блюда', be: 'Вегетарыянскія стравы', en: 'Vegetarian dishes', pl: 'Dania wegetariańskie', zh: '素食菜品' },
  'venue.contrast.f4': { ru: 'Терасса', be: 'Тэраса', en: 'Terrace', pl: 'Taras', zh: '露台' },

  'venue.le-pigeon.f0': { ru: 'Завтраки весь день', be: 'Сняданкі ўвесь дзень', en: 'All-day breakfasts', pl: 'Śniadania przez cały dzień', zh: '全天早餐' },
  'venue.le-pigeon.f1': { ru: 'Альтернативный кофе', be: 'Альтэрнатыўная кава', en: 'Alternative coffee', pl: 'Kawa alternatywna', zh: '替代咖啡' },
  'venue.le-pigeon.f2': { ru: 'Десерты', be: 'Дэсэрты', en: 'Desserts', pl: 'Desery', zh: '甜点' },
  'venue.le-pigeon.f3': { ru: 'Обеденное меню', be: 'Абедзеннае меню', en: 'Lunch menu', pl: 'Menu obiadowe', zh: '午餐菜单' },
  'venue.le-pigeon.f4': { ru: 'Доставка', be: 'Дастаўка', en: 'Delivery', pl: 'Dostawa', zh: '配送' },

  'venue.ember.f0': { ru: 'Панорамный вид', be: 'Панарамны від', en: 'Panoramic view', pl: 'Widok panoramiczny', zh: '全景视野' },
  'venue.ember.f1': { ru: 'Винная карта', be: 'Вінная карта', en: 'Wine list', pl: 'Karta win', zh: '葡萄酒单' },
  'venue.ember.f2': { ru: 'Премиум сервис', be: 'Прэміум сэрвіс', en: 'Premium service', pl: 'Obsługa premium', zh: '高端服务' },
  'venue.ember.f3': { ru: 'Терасса', be: 'Тэраса', en: 'Terrace', pl: 'Taras', zh: '露台' },
  'venue.ember.f4': { ru: 'Вегетарианские блюда', be: 'Вегетарыянскія стравы', en: 'Vegetarian dishes', pl: 'Dania wegetariańskie', zh: '素食菜品' },

  'venue.leone.f0': { ru: 'Коктейльная карта', be: 'Кактэйльная карта', en: 'Cocktail menu', pl: 'Karta koktajli', zh: '鸡尾酒单' },
  'venue.leone.f1': { ru: 'DJ сеты', be: 'DJ сэты', en: 'DJ sets', pl: 'Sety DJ-skie', zh: 'DJ演出' },
  'venue.leone.f2': { ru: 'Летняя терраса', be: 'Летняя тэраса', en: 'Summer terrace', pl: 'Taras letni', zh: '夏季露台' },

  'venue.the-odi.f0': { ru: 'Завтраки', be: 'Сняданкі', en: 'Breakfasts', pl: 'Śniadania', zh: '早餐' },
  'venue.the-odi.f1': { ru: 'Обеденное меню', be: 'Абедзеннае меню', en: 'Lunch menu', pl: 'Menu obiadowe', zh: '午餐菜单' },
  'venue.the-odi.f2': { ru: 'Десерты', be: 'Дэсэрты', en: 'Desserts', pl: 'Desery', zh: '甜点' },

  'venue.pellegrino.f0': { ru: 'Итальянская кухня', be: 'Італьянская кухня', en: 'Italian cuisine', pl: 'Kuchnia włoska', zh: '意大利美食' },
  'venue.pellegrino.f1': { ru: 'Винная карта', be: 'Вінная карта', en: 'Wine list', pl: 'Karta win', zh: '葡萄酒单' },
  'venue.pellegrino.f2': { ru: 'Живая музыка', be: 'Жывая музыка', en: 'Live music', pl: 'Muzyka na żywo', zh: '现场音乐' },

  'venue.lovemyrr.f0': { ru: 'Можно с животными', be: 'Можна з жывёламі', en: 'Pet friendly', pl: 'Przyjazne zwierzętom', zh: '允许携带宠物' },
  'venue.lovemyrr.f1': { ru: 'Цветочный шоп', be: 'Кветкавы шоп', en: 'Flower shop', pl: 'Kwiaciarnia', zh: '花店' },
  'venue.lovemyrr.f2': { ru: 'Веган десерты', be: 'Веган дэсэрты', en: 'Vegan desserts', pl: 'Desery wegańskie', zh: '纯素甜点' },

  'venue.malevich.f0': { ru: 'Арт-пространство', be: 'Арт-прастора', en: 'Art space', pl: 'Przestrzeń artystyczna', zh: '艺术空间' },
  'venue.malevich.f1': { ru: 'Обеденное меню', be: 'Абедзеннае меню', en: 'Lunch menu', pl: 'Menu obiadowe', zh: '午餐菜单' },
  'venue.malevich.f2': { ru: 'Wifi', be: 'Wifi', en: 'Wifi', pl: 'Wifi', zh: '无线网络' },
  'venue.malevich.f3': { ru: 'Бранчи', be: 'Бранчы', en: 'Brunches', pl: 'Brunchy', zh: '早午餐' },

  'venue.mesto-pro-edu.f0': { ru: 'Европейская кухня', be: 'Еўрапейская кухня', en: 'European cuisine', pl: 'Kuchnia europejska', zh: '欧洲美食' },
  'venue.mesto-pro-edu.f1': { ru: 'Банкеты', be: 'Банкеты', en: 'Banquets', pl: 'Bankiety', zh: '宴会' },
  'venue.mesto-pro-edu.f2': { ru: 'Летняя терраса', be: 'Летняя тэраса', en: 'Summer terrace', pl: 'Taras letni', zh: '夏季露台' },

  'venue.roast.f0': { ru: 'Собственная обжарка', be: 'Уласная абжарка', en: 'Own roastery', pl: 'Własna palarnia', zh: '自有烘焙坊' },
  'venue.roast.f1': { ru: 'Дог-френдли', be: 'Дог-френдлі', en: 'Dog-friendly', pl: 'Przyjazne psom', zh: '对狗友好' },
  'venue.roast.f2': { ru: 'Wifi', be: 'Wifi', en: 'Wifi', pl: 'Wifi', zh: '无线网络' },

  'venue.vasilki.f0': { ru: 'Завтраки', be: 'Сняданкі', en: 'Breakfasts', pl: 'Śniadania', zh: '早餐' },
  'venue.vasilki.f1': { ru: 'Детское меню', be: 'Дзіцячае меню', en: 'Kids menu', pl: 'Menu dziecięce', zh: '儿童菜单' },

  'venue.zerno.f0': { ru: 'Спешелти кофе', be: 'Спэшэлці кава', en: 'Specialty coffee', pl: 'Kawa speciality', zh: '精品咖啡' },
  'venue.zerno.f1': { ru: 'Завтраки', be: 'Сняданкі', en: 'Breakfasts', pl: 'Śniadania', zh: '早餐' },
  'venue.zerno.f2': { ru: 'Dog-friendly', be: 'Dog-friendly', en: 'Dog-friendly', pl: 'Przyjazne psom', zh: '对狗友好' },
  'venue.zerno.f3': { ru: 'Тихая атмосфера', be: 'Ціхая атмасфера', en: 'Quiet atmosphere', pl: 'Cicha atmosfera', zh: '安静氛围' },
  'venue.zerno.f4': { ru: 'Вино', be: 'Віно', en: 'Wine', pl: 'Wino', zh: '葡萄酒' },
  'venue.zerno.f5': { ru: 'Своя выпечка', be: 'Свая выпечка', en: 'Own pastries', pl: 'Własne wypieki', zh: '自制烘焙' },

  'venue.varka.f0': { ru: 'Кофе с собой', be: 'Кава з сабой', en: 'Coffee to go', pl: 'Kawa na wynos', zh: '外带咖啡' },
  'venue.varka.f1': { ru: 'Матча', be: 'Матча', en: 'Matcha', pl: 'Matcha', zh: '抹茶' },
  'venue.varka.f2': { ru: 'Выпечка', be: 'Выпечка', en: 'Pastries', pl: 'Wypieki', zh: '烘焙' },

  'venue.zavod.f0': { ru: 'Караоке', be: 'Караоке', en: 'Karaoke', pl: 'Karaoke', zh: '卡拉OK' },
  'venue.zavod.f1': { ru: 'Настольные игры', be: 'Настольныя гульні', en: 'Board games', pl: 'Gry planszowe', zh: '桌游' },
  'venue.zavod.f2': { ru: 'Спорт-трансляции', be: 'Спорт-трансляцыі', en: 'Sports broadcasts', pl: 'Transmisje sportowe', zh: '体育转播' },

  // ========== VENUE WORKING HOURS ==========
  'venue.contrast.wh0': {
    ru: 'Воскресенье - Четверг: 08:00 - 21:00\nПятница - Суббота: 09:00 - 23:00',
    be: 'Нядзеля - Чацвер: 08:00 - 21:00\nПятніца - Субота: 09:00 - 23:00',
    en: 'Sun - Thu: 08:00 - 21:00\nFri - Sat: 09:00 - 23:00',
    pl: 'Nd - Czw: 08:00 - 21:00\nPt - Sob: 09:00 - 23:00',
    zh: '周日 - 周四: 08:00 - 21:00\n周五 - 周六: 09:00 - 23:00'
  },
  'venue.le-pigeon.wh0': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.ember.wh0': { ru: 'Ежедневно: 12:00 — 00:00', be: 'Штодня: 12:00 — 00:00', en: 'Daily: 12:00 — 00:00', pl: 'Codziennie: 12:00 — 00:00', zh: '每天: 12:00 — 00:00' },
  'venue.lidbeer.wh0': { ru: 'Круглосуточно', be: 'Кругласутачна', en: '24/7', pl: 'Całodobowo', zh: '全天候' },
  'venue.lidbeer.wh2': {
    ru: 'Понедельник - Четверг, Воскресенье: 16:00 — 02:00\nПятница - Суббота: 16:00 — 05:00',
    be: 'Панядзелак - Чацвер, Нядзеля: 16:00 — 02:00\nПятніца - Субота: 16:00 — 05:00',
    en: 'Mon - Thu, Sun: 16:00 — 02:00\nFri - Sat: 16:00 — 05:00',
    pl: 'Pon - Czw, Nd: 16:00 — 02:00\nPt - Sob: 16:00 — 05:00',
    zh: '周一 - 周四, 周日: 16:00 — 02:00\n周五 - 周六: 16:00 — 05:00'
  },
  'venue.lidbeer.wh3': {
    ru: 'Воскресенье - Четверг: 12:00 — 02:00\nПятница - Суббота: 12:00 — 04:00',
    be: 'Нядзеля - Чацвер: 12:00 — 02:00\nПятніца - Субота: 12:00 — 04:00',
    en: 'Sun - Thu: 12:00 — 02:00\nFri - Sat: 12:00 — 04:00',
    pl: 'Nd - Czw: 12:00 — 02:00\nPt - Sob: 12:00 — 04:00',
    zh: '周日 - 周四: 12:00 — 02:00\n周五 - 周六: 12:00 — 04:00'
  },
  'venue.leone.wh0': {
    ru: 'Понедельник - Четверг: 18:00 — 02:00\nПятница - Воскресенье: 17:00 — 04:00',
    be: 'Панядзелак - Чацвер: 18:00 — 02:00\nПятніца - Нядзеля: 17:00 — 04:00',
    en: 'Mon - Thu: 18:00 — 02:00\nFri - Sun: 17:00 — 04:00',
    pl: 'Pon - Czw: 18:00 — 02:00\nPt - Nd: 17:00 — 04:00',
    zh: '周一 - 周四: 18:00 — 02:00\n周五 - 周日: 17:00 — 04:00'
  },
  'venue.the-odi.wh0': { ru: 'Ежедневно: 09:00 — 22:00', be: 'Штодня: 09:00 — 22:00', en: 'Daily: 09:00 — 22:00', pl: 'Codziennie: 09:00 — 22:00', zh: '每天: 09:00 — 22:00' },
  'venue.pellegrino.wh0': {
    ru: 'Воскресенье - Четверг: 11:00 — 00:00\nПятница: 11:00 — 01:00',
    be: 'Нядзеля - Чацвер: 11:00 — 00:00\nПятніца: 11:00 — 01:00',
    en: 'Sun - Thu: 11:00 — 00:00\nFri: 11:00 — 01:00',
    pl: 'Nd - Czw: 11:00 — 00:00\nPt: 11:00 — 01:00',
    zh: '周日 - 周四: 11:00 — 00:00\n周五: 11:00 — 01:00'
  },
  'venue.lovemyrr.wh0': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.malevich.wh0': {
    ru: 'Воскресенье - Четверг: 12:00 — 23:00\nПятница - Суббота: 12:00 — 00:00',
    be: 'Нядзеля - Чацвер: 12:00 — 23:00\nПятніца - Субота: 12:00 — 00:00',
    en: 'Sun - Thu: 12:00 — 23:00\nFri - Sat: 12:00 — 00:00',
    pl: 'Nd - Czw: 12:00 — 23:00\nPt - Sob: 12:00 — 00:00',
    zh: '周日 - 周四: 12:00 — 23:00\n周五 - 周六: 12:00 — 00:00'
  },
  'venue.mesto-pro-edu.wh0': {
    ru: 'Понедельник - Пятница: 09:00 — 00:00\nСуббота - Воскресенье: 12:00 — 00:00',
    be: 'Панядзелак - Пятніца: 09:00 — 00:00\nСубота - Нядзеля: 12:00 — 00:00',
    en: 'Mon - Fri: 09:00 — 00:00\nSat - Sun: 12:00 — 00:00',
    pl: 'Pon - Pt: 09:00 — 00:00\nSob - Nd: 12:00 — 00:00',
    zh: '周一 - 周五: 09:00 — 00:00\n周六 - 周日: 12:00 — 00:00'
  },
  'venue.roast.wh0': {
    ru: 'Понедельник - Пятница: 08:00 — 20:00\nСуббота - Воскресенье: 09:00 — 21:00',
    be: 'Панядзелак - Пятніца: 08:00 — 20:00\nСубота - Нядзеля: 09:00 — 21:00',
    en: 'Mon - Fri: 08:00 — 20:00\nSat - Sun: 09:00 — 21:00',
    pl: 'Pon - Pt: 08:00 — 20:00\nSob - Nd: 09:00 — 21:00',
    zh: '周一 - 周五: 08:00 — 20:00\n周六 - 周日: 09:00 — 21:00'
  },
  'venue.roast.wh2': {
    ru: 'Понедельник - Суббота: 09:00 — 20:00\nВоскресенье: выходной',
    be: 'Панядзелак - Субота: 09:00 — 20:00\nНядзеля: выхадны',
    en: 'Mon - Sat: 09:00 — 20:00\nSun: closed',
    pl: 'Pon - Sob: 09:00 — 20:00\nNd: zamknięte',
    zh: '周一 - 周六: 09:00 — 20:00\n周日: 休息'
  },
  'venue.vasilki.wh0': { ru: 'Ежедневно: 09:00 — 23:00', be: 'Штодня: 09:00 — 23:00', en: 'Daily: 09:00 — 23:00', pl: 'Codziennie: 09:00 — 23:00', zh: '每天: 09:00 — 23:00' },
  'venue.vasilki.wh1': { ru: 'Вс-Чт: 10:00-22:00, Пт-Сб: 10:00-23:00', be: 'Нд-Чц: 10:00-22:00, Пт-Сб: 10:00-23:00', en: 'Sun-Thu: 10:00-22:00, Fri-Sat: 10:00-23:00', pl: 'Nd-Czw: 10:00-22:00, Pt-Sob: 10:00-23:00', zh: '周日-周四: 10:00-22:00, 周五-周六: 10:00-23:00' },
  'venue.vasilki.wh2': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.zerno.wh0': { ru: 'Ежедневно: 08:00 — 22:00', be: 'Штодня: 08:00 — 22:00', en: 'Daily: 08:00 — 22:00', pl: 'Codziennie: 08:00 — 22:00', zh: '每天: 08:00 — 22:00' },
  'venue.zerno.wh1': { ru: 'Ежедневно: 09:00 — 23:00', be: 'Штодня: 09:00 — 23:00', en: 'Daily: 09:00 — 23:00', pl: 'Codziennie: 09:00 — 23:00', zh: '每天: 09:00 — 23:00' },
  'venue.zerno.wh2': { ru: 'Ежедневно: 10:00 — 23:00', be: 'Штодня: 10:00 — 23:00', en: 'Daily: 10:00 — 23:00', pl: 'Codziennie: 10:00 — 23:00', zh: '每天: 10:00 — 23:00' },
  'venue.varka.wh0': { ru: 'Ежедневно: 08:00 — 22:00', be: 'Штодня: 08:00 — 22:00', en: 'Daily: 08:00 — 22:00', pl: 'Codziennie: 08:00 — 22:00', zh: '每天: 08:00 — 22:00' },
  'venue.varka.wh1': { ru: 'Ежедневно: 07:30 — 22:00', be: 'Штодня: 07:30 — 22:00', en: 'Daily: 07:30 — 22:00', pl: 'Codziennie: 07:30 — 22:00', zh: '每天: 07:30 — 22:00' },
  'venue.varka.wh3': { ru: 'Ежедневно: 08:00 — 21:00', be: 'Штодня: 08:00 — 21:00', en: 'Daily: 08:00 — 21:00', pl: 'Codziennie: 08:00 — 21:00', zh: '每天: 08:00 — 21:00' },
  'venue.zavod.wh0': { ru: 'Ежедневно: 17:00 — 06:00', be: 'Штодня: 17:00 — 06:00', en: 'Daily: 17:00 — 06:00', pl: 'Codziennie: 17:00 — 06:00', zh: '每天: 17:00 — 06:00' },

  // ========== VENUE ADDRESSES ==========
  'venue.contrast.addr0': { ru: 'пр-т Победителей 102', be: 'пр-т Пераможцаў 102', en: '102 Pobediteley Ave', pl: 'al. Zwycięzców 102', zh: '胜利大道102号' },
  'venue.le-pigeon.addr0': { ru: 'пр-т Независимости, 37', be: 'пр-т Незалежнасці, 37', en: '37 Nezavisimosti Ave', pl: 'al. Niepodległości 37', zh: '独立大道37号' },
  'venue.ember.addr0': { ru: 'пр-т Победителей, 9', be: 'пр-т Пераможцаў, 9', en: '9 Pobediteley Ave', pl: 'al. Zwycięzców 9', zh: '胜利大道9号' },
  'venue.lidbeer.addr0': { ru: 'ул. Интернациональная, 33', be: 'вул. Інтэрнацыянальная, 33', en: '33 Internatsyonalnaya St', pl: 'ul. Międzynarodowa 33', zh: '国际街33号' },
  'venue.lidbeer.addr1': { ru: 'пр-т Независимости, 58', be: 'пр-т Незалежнасці, 58', en: '58 Nezavisimosti Ave', pl: 'al. Niepodległości 58', zh: '独立大道58号' },
  'venue.lidbeer.addr2': { ru: 'ул. Якуба Коласа, 37', be: 'вул. Якуба Коласа, 37', en: '37 Yakuba Kolasa St', pl: 'ul. Jakuba Kołasa 37', zh: '雅库巴·科拉斯街37号' },
  'venue.lidbeer.addr3': { ru: 'ул. Комсомольская, 18', be: 'вул. Камсамольская, 18', en: '18 Kamsamolskaya St', pl: 'ul. Komsomolska 18', zh: '共青团街18号' },
  'venue.lidbeer.addr4': { ru: 'К. Маркса, 20', be: 'К. Маркса, 20', en: '20 K. Marksa St', pl: 'ul. K. Marksa 20', zh: 'K.马克思街20号' },
  'venue.lidbeer.addr5': { ru: 'ул. Свердлова, 2', be: 'вул. Свярдлова, 2', en: '2 Sverdlova St', pl: 'ul. Swierdłowa 2', zh: '斯维尔德洛夫街2号' },
  'venue.leone.addr0': { ru: 'ул. Зыбицкая, 4', be: 'вул. Зыбіцкая, 4', en: '4 Zybitskaya St', pl: 'ul. Zybitska 4', zh: '济比察街4号' },
  'venue.the-odi.addr0': { ru: 'пр-т Независимости, 12', be: 'пр-т Незалежнасці, 12', en: '12 Nezavisimosti Ave', pl: 'al. Niepodległości 12', zh: '独立大道12号' },
  'venue.the-odi.addr1': { ru: 'ул. Ратомская, 7', be: 'вул. Ратомская, 7', en: '7 Ratamskaya St', pl: 'ul. Ratomskaja 7', zh: '拉托姆斯卡亚街7号' },
  'venue.pellegrino.addr0': { ru: 'ул. Интернациональная, 9', be: 'вул. Інтэрнацыянальная, 9', en: '9 Internatsyonalnaya St', pl: 'ul. Międzynarodowa 9', zh: '国际街9号' },
  'venue.lovemyrr.addr0': { ru: 'ул. Ленина, 15', be: 'вул. Леніна, 15', en: '15 Lenina St', pl: 'ul. Lenina 15', zh: '列宁街15号' },
  'venue.malevich.addr0': { ru: 'ул. Карла Маркса, 24', be: 'вул. Карла Маркса, 24', en: '24 Karla Marksa St', pl: 'ul. Karla Marksa 24', zh: '卡尔·马克思街24号' },
  'venue.mesto-pro-edu.addr0': { ru: 'ул. Октябрьская, 5А', be: 'вул. Кастрычніцкая, 5А', en: '5A Kastrychnitskaya St', pl: 'ul. Październikowa 5A', zh: '十月街5A号' },
  'venue.roast.addr0': { ru: 'ул. Белинского 23', be: 'вул. Белінскага 23', en: '23 Belinskogo St', pl: 'ul. Bielińskiego 23', zh: '别林斯基街23号' },
  'venue.roast.addr1': { ru: 'ул. Тимирязева 28', be: 'вул. Ціміразева 28', en: '28 Timiryazeva St', pl: 'ul. Timiriaziewa 28', zh: '季米里亚泽夫街28号' },
  'venue.roast.addr2': { ru: 'пер. Софьи Ковалевской, 46', be: 'пер. Соф\'і Кавалеўскай, 46', en: '46 Sof\'i Kovalevskoy Lane', pl: 'prz. Sofii Kowalewskiej 46', zh: '索菲亚·科瓦列夫斯卡娅巷46号' },
  'venue.roast.addr3': { ru: 'ул. Независимости 95', be: 'вул. Незалежнасці 95', en: '95 Nezavisimosti St', pl: 'ul. Niepodległości 95', zh: '独立街95号' },
  'venue.vasilki.addr0': { ru: 'ул. Якуба Коласа, 37', be: 'вул. Якуба Коласа, 37', en: '37 Yakuba Kolasa St', pl: 'ul. Jakuba Kołasa 37', zh: '雅库巴·科拉斯街37号' },
  'venue.vasilki.addr1': { ru: 'ул. Бобруйская, 6', be: 'вул. Бабруйская, 6', en: '6 Babruyskaya St', pl: 'ul. Bobrujska 6', zh: '巴布鲁伊斯克街6号' },
  'venue.vasilki.addr2': { ru: 'пр-т Победителей, 9', be: 'пр-т Пераможцаў, 9', en: '9 Pobediteley Ave', pl: 'al. Zwycięzców 9', zh: '胜利大道9号' },
  'venue.vasilki.addr3': { ru: 'ул. Петра Мстиславца, 11', be: 'вул. Пятра Мсціслаўца, 11', en: '11 Petra Mstislavtsa St', pl: 'ul. Petra Mścisławca 11', zh: '彼得·姆斯季斯拉夫茨街11号' },
  'venue.vasilki.addr4': { ru: 'пр. Независимости, 89', be: 'пр. Незалежнасці, 89', en: '89 Nezavisimosti Ave', pl: 'al. Niepodległości 89', zh: '独立大道89号' },
  'venue.vasilki.addr5': { ru: 'ул. Петра Глебки, 5', be: 'вул. Пятра Глебкі, 5', en: '5 Petra Hlebki St', pl: 'ul. Petra Hlebki 5', zh: '彼得·格列布基街5号' },
  'venue.vasilki.addr6': { ru: 'пр. Независимости, 58', be: 'пр. Незалежнасці, 58', en: '58 Nezavisimosti Ave', pl: 'al. Niepodległości 58', zh: '独立大道58号' },
  'venue.vasilki.addr7': { ru: 'пр. Независимости, 16', be: 'пр. Незалежнасці, 16', en: '16 Nezavisimosti Ave', pl: 'al. Niepodległości 16', zh: '独立大道16号' },
  'venue.vasilki.addr8': { ru: 'ул. Налибокская, 1', be: 'вул. Налібоцкая, 1', en: '1 Nalibokskaya St', pl: 'ul. Nalibocka 1', zh: '纳利博茨卡亚街1号' },
  'venue.vasilki.addr9': { ru: 'ТРЦ Экспобел', be: 'ТРЦ Экспобел', en: 'Expobel Mall', pl: 'Centrum Expo', zh: '会展中心商场' },
  'venue.vasilki.addr10': { ru: 'пр. Рокоссовского, 2', be: 'пр. Ракасоўскага, 2', en: '2 Rokossovskogo Ave', pl: 'al. Rokossowskiego 2', zh: '罗科索夫斯基大道2号' },
  'venue.vasilki.addr11': { ru: 'пр. Партизанский, 150А', be: 'пр. Партызанскі, 150А', en: '150A Partyzanski Ave', pl: 'al. Partyzantów 150A', zh: '游击队大道150A号' },
  'venue.vasilki.addr12': { ru: 'ул. Тимирязева, 74А', be: 'вул. Ціміразева, 74А', en: '74A Timiryazeva St', pl: 'ul. Timiriaziewa 74A', zh: '季米里亚泽夫街74A号' },
  'venue.zerno.addr0': { ru: 'пр-т Независимости, 46', be: 'пр-т Незалежнасці, 46', en: '46 Nezavisimosti Ave', pl: 'al. Niepodległości 46', zh: '独立大道46号' },
  'venue.zerno.addr1': { ru: 'ул. Козлова, 6', be: 'вул. Козлава, 6', en: '6 Kozlova St', pl: 'ul. Kozłowa 6', zh: '科兹洛夫街6号' },
  'venue.zerno.addr2': { ru: 'ул. Интернациональная, 27Б', be: 'вул. Інтэрнацыянальная, 27Б', en: '27B Internatsyonalnaya St', pl: 'ul. Międzynarodowa 27B', zh: '国际街27B号' },
  'venue.varka.addr0': { ru: 'пр-т Независимости, 91', be: 'пр-т Незалежнасці, 91', en: '91 Nezavisimosti Ave', pl: 'al. Niepodległości 91', zh: '独立大道91号' },
  'venue.varka.addr1': { ru: 'ул. Романовская Слобода, 5', be: 'вул. Раманаўская Слабада, 5', en: '5 Ramanouskaya Slabada St', pl: 'ul. Romańska Słoboda 5', zh: '罗马诺夫斯卡亚·斯洛博达街5号' },
  'venue.varka.addr2': { ru: 'ул. Октябрьская, 16', be: 'вул. Кастрычніцкая, 16', en: '16 Kastrychnitskaya St', pl: 'ul. Październikowa 16', zh: '十月街16号' },
  'venue.varka.addr3': { ru: 'бул. Шевченко, 1', be: 'бул. Шаўчэнкі, 1', en: '1 Shevchenko Blvd', pl: 'bul. Szewczenki 1', zh: '舍甫琴科大道1号' },
  'venue.varka.addr4': { ru: 'ул. Яна Чечота, 7', be: 'вул. Яна Чэхота, 7', en: '7 Yana Chekhota St', pl: 'ul. Jana Czechota 7', zh: '扬·切霍塔街7号' },
  'venue.varka.addr5': { ru: 'Логойский тракт, 15/2', be: 'Лагойскі тракт, 15/2', en: '15/2 Lahoyski Trakt', pl: 'Trakt Łohojski 15/2', zh: '洛戈伊斯克大道15/2号' },
  'venue.zavod.addr0': { ru: 'пр-т Машерова, 19', be: 'пр-т Машэрава, 19', en: '19 Mashyerava Ave', pl: 'al. Maszerowa 19', zh: '马舍罗夫大道19号' },

  // ========== VENUE NAMES ==========
  // Russian originals → transliterated to Latin; English originals → kept as-is
  // Chinese: English names kept + category; Russian names → phonetic Chinese + category
  'venue.name.contrast': { ru: 'Контраст', be: 'Кантраст', en: 'Kontrast', pl: 'Kontrast', zh: '康特拉斯餐厅' },
  'venue.name.le-pigeon': { ru: 'Le Pigeon', be: 'Le Pigeon', en: 'Le Pigeon', pl: 'Le Pigeon', zh: 'Le Pigeon 咖啡店' },
  'venue.name.ember': { ru: 'Ember', be: 'Ember', en: 'Ember', pl: 'Ember', zh: 'Ember 餐厅' },
  'venue.name.lidbeer': { ru: 'Lidbeer', be: 'Lidbeer', en: 'Lidbeer', pl: 'Lidbeer', zh: 'Lidbeer 酒吧' },
  'venue.name.leone': { ru: 'Leone', be: 'Leone', en: 'Leone', pl: 'Leone', zh: 'Leone 酒吧' },
  'venue.name.the-odi': { ru: 'The Odi', be: 'The Odi', en: 'The Odi', pl: 'The Odi', zh: 'The Odi 咖啡馆' },
  'venue.name.pellegrino': { ru: 'Pellegrino', be: 'Pellegrino', en: 'Pellegrino', pl: 'Pellegrino', zh: 'Pellegrino 餐厅' },
  'venue.name.lovemyrr': { ru: 'Лавмурр', be: 'Лавмурр', en: 'Lavmyrr', pl: 'Lavmyrr', zh: '拉夫穆尔咖啡店' },
  'venue.name.malevich': { ru: 'Малевич', be: 'Малевіч', en: 'Malevich', pl: 'Malewicz', zh: '马列维奇餐厅' },
  'venue.name.mesto-pro-edu': { ru: 'Место про еду', be: 'Месца пра ежу', en: 'Mesto pro edu', pl: 'Mesto pro edu', zh: '美斯托餐厅' },
  'venue.name.roast': { ru: 'Roast', be: 'Roast', en: 'Roast', pl: 'Roast', zh: 'Roast 咖啡店' },
  'venue.name.vasilki': { ru: 'Васильки', be: 'Васількі', en: 'Vasilki', pl: 'Vasilki', zh: '瓦西里基餐厅' },
  'venue.name.zerno': { ru: 'Зерно', be: 'Зерна', en: 'Zerno', pl: 'Zerno', zh: '泽尔诺咖啡店' },
  'venue.name.varka': { ru: 'Varka', be: 'Varka', en: 'Varka', pl: 'Varka', zh: 'Varka 咖啡店' },
  'venue.name.zavod': { ru: 'Zavod', be: 'Zavod', en: 'Zavod', pl: 'Zavod', zh: 'Zavod 酒吧' },

  // ========== MISSING WORKING HOURS (for branches that share common schedules) ==========
  'venue.lidbeer.wh1': { ru: 'Круглосуточно', be: 'Кругласутачна', en: '24/7', pl: 'Całodobowo', zh: '全天候' },
  'venue.lidbeer.wh4': { ru: 'Воскресенье - Четверг: 12:00 — 02:00\nПятница - Суббота: 12:00 — 04:00', be: 'Нядзеля - Чацвер: 12:00 — 02:00\nПятніца - Субота: 12:00 — 04:00', en: 'Sun - Thu: 12:00 — 02:00\nFri - Sat: 12:00 — 04:00', pl: 'Nd - Czw: 12:00 — 02:00\nPt - Sob: 12:00 — 04:00', zh: '周日 - 周四: 12:00 — 02:00\n周五 - 周六: 12:00 — 04:00' },
  'venue.lidbeer.wh5': { ru: 'Воскресенье  - Четверг: 12:00 — 02:00\n Пятница  - Суббота: 12:00 — 06:00', be: 'Нядзеля - Чацвер: 12:00 — 02:00\nПятніца - Субота: 12:00 — 06:00', en: 'Sun - Thu: 12:00 — 02:00\nFri - Sat: 12:00 — 06:00', pl: 'Nd - Czw: 12:00 — 02:00\nPt - Sob: 12:00 — 06:00', zh: '周日 - 周四: 12:00 — 02:00\n周五 - 周六: 12:00 — 06:00' },
  'venue.the-odi.wh1': { ru: 'Ежедневно: 09:00 — 22:00', be: 'Штодня: 09:00 — 22:00', en: 'Daily: 09:00 — 22:00', pl: 'Codziennie: 09:00 — 22:00', zh: '每天: 09:00 — 22:00' },
  'venue.roast.wh1': { ru: 'Понедельник - Пятница: 08:00 — 20:00\nСуббота - Воскресенье: 09:00 — 21:00', be: 'Панядзелак - Пятніца: 08:00 — 20:00\nСубота - Нядзеля: 09:00 — 21:00', en: 'Mon - Fri: 08:00 — 20:00\nSat - Sun: 09:00 — 21:00', pl: 'Pon - Pt: 08:00 — 20:00\nSob - Nd: 09:00 — 21:00', zh: '周一 - 周五: 08:00 — 20:00\n周六 - 周日: 09:00 — 21:00' },
  'venue.roast.wh3': { ru: 'Понедельник - Пятница: 08:00 — 23:00\nСуббота - Воскресенье: 09:00 — 23:00', be: 'Панядзелак - Пятніца: 08:00 — 23:00\nСубота - Нядзеля: 09:00 — 23:00', en: 'Mon - Fri: 08:00 — 23:00\nSat - Sun: 09:00 — 23:00', pl: 'Pon - Pt: 08:00 — 23:00\nSob - Nd: 09:00 — 23:00', zh: '周一 - 周五: 08:00 — 23:00\n周六 - 周日: 09:00 — 23:00' },
  'venue.vasilki.wh3': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh4': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh5': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh6': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh7': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh8': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh9': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh10': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh11': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.vasilki.wh12': { ru: 'Ежедневно: 10:00 — 22:00', be: 'Штодня: 10:00 — 22:00', en: 'Daily: 10:00 — 22:00', pl: 'Codziennie: 10:00 — 22:00', zh: '每天: 10:00 — 22:00' },
  'venue.varka.wh2': { ru: 'Ежедневно: 09:00 — 23:00', be: 'Штодня: 09:00 — 23:00', en: 'Daily: 09:00 — 23:00', pl: 'Codziennie: 09:00 — 23:00', zh: '每天: 09:00 — 23:00' },
  'venue.varka.wh4': { ru: 'Ежедневно: 08:00 — 21:00', be: 'Штодня: 08:00 — 21:00', en: 'Daily: 08:00 — 21:00', pl: 'Codziennie: 08:00 — 21:00', zh: '每天: 08:00 — 21:00' },
  'venue.varka.wh5': { ru: 'Ежедневно: 08:00 — 21:00', be: 'Штодня: 08:00 — 21:00', en: 'Daily: 08:00 — 21:00', pl: 'Codziennie: 08:00 — 21:00', zh: '每天: 08:00 — 21:00' },

  // ========== MISSING FEATURES (for branches with features not yet translated) ==========
  'venue.lidbeer.f0': { ru: 'Живая музыка', be: 'Жывая музыка', en: 'Live music', pl: 'Muzyka na żywo', zh: '现场音乐' },
  'venue.lidbeer.f1': { ru: 'Танцпол', be: 'Танцпакой', en: 'Dance floor', pl: 'Parkiet taneczny', zh: '舞池' },
  'venue.lidbeer.f2': { ru: 'Детское меню', be: 'Дзіцячае меню', en: 'Kids menu', pl: 'Menu dziecięce', zh: '儿童菜单' },
  'venue.lidbeer.f3': { ru: 'Оплата картой', be: 'Аплата картай', en: 'Card payment', pl: 'Płatność kartą', zh: '刷卡支付' },
  'venue.lidbeer.f4': { ru: 'Спорт-трансляции', be: 'Спорт-трансляцыі', en: 'Sports broadcasts', pl: 'Transmisje sportowe', zh: '体育转播' },
  'venue.lidbeer.f5': { ru: 'Летняя терраса', be: 'Летняя тэраса', en: 'Summer terrace', pl: 'Taras letni', zh: '夏季露台' },
  'venue.lidbeer.f6': { ru: 'Настольные игры', be: 'Настольныя гульні', en: 'Board games', pl: 'Gry planszowe', zh: '桌游' },
  'venue.lidbeer.f7': { ru: 'Винная карта', be: 'Вінная карта', en: 'Wine list', pl: 'Karta win', zh: '葡萄酒单' },
  'venue.lidbeer.f8': { ru: 'Обеденное меню', be: 'Абедзеннае меню', en: 'Lunch menu', pl: 'Menu obiadowe', zh: '午餐菜单' },
  'venue.lidbeer.f9': { ru: 'Коктейли', be: 'Кактэйлі', en: 'Cocktails', pl: 'Koktajle', zh: '鸡尾酒' },
  'venue.lidbeer.f10': { ru: 'Кальян', be: 'Кальян', en: 'Hookah', pl: 'Fajka wodna', zh: '水烟' },
  'venue.vasilki.f2': { ru: 'В ТЦ', be: 'У ТЦ', en: 'In mall', pl: 'W centrum handlowym', zh: '在商场内' },
  'venue.vasilki.f3': { ru: 'Панорамный вид', be: 'Панарамны від', en: 'Panoramic view', pl: 'Widok panoramiczny', zh: '全景视野' },
  'venue.vasilki.f4': { ru: 'Парковка ТРЦ', be: 'Паркоўка ТРЦ', en: 'Mall parking', pl: 'Parking centrum', zh: '商场停车场' },
  'venue.vasilki.f5': { ru: 'Семейный ресторан', be: 'Сямейны рэстаран', en: 'Family restaurant', pl: 'Restauracja rodzinna', zh: '家庭餐厅' },
  'venue.vasilki.f6': { ru: 'Детская комната', be: 'Дзіцячы пакой', en: 'Kids room', pl: 'Pokój dziecięcy', zh: '儿童房' },
  'venue.vasilki.f7': { ru: 'Удобное расположение', be: 'Зручнае размяшчэнне', en: 'Convenient location', pl: 'Wygodna lokalizacja', zh: '交通便利' },
  'venue.varka.f3': { ru: 'Быстрое обслуживание', be: 'Хуткае абслугоўванне', en: 'Fast service', pl: 'Szybka obsługa', zh: '快速服务' },
  'venue.varka.f4': { ru: 'Для работы', be: 'Для працы', en: 'Work-friendly', pl: 'Przyjazne do pracy', zh: '适合工作' },
  'venue.varka.f5': { ru: 'Стильный интерьер', be: 'Стыльны інтэр\'ер', en: 'Stylish interior', pl: 'Stylowe wnętrze', zh: '时尚内饰' },
  'venue.varka.f6': { ru: 'Молодежно', be: 'Моладзёва', en: 'Youthful', pl: 'Młodzieżowy', zh: '年轻化' },
  'venue.varka.f7': { ru: 'Парковка', be: 'Паркоўка', en: 'Parking', pl: 'Parking', zh: '停车场' },
  'venue.varka.f8': { ru: 'Wifi', be: 'Wifi', en: 'Wifi', pl: 'Wifi', zh: '无线网络' },
  'venue.zerno.f6': { ru: 'В центре', be: 'У цэнтры', en: 'In the center', pl: 'W centrum', zh: '在市中心' },
  'venue.zerno.f7': { ru: 'Летняя терраса', be: 'Летняя тэраса', en: 'Summer terrace', pl: 'Taras letni', zh: '夏季露台' },
  'venue.roast.f3': { ru: 'Кофе с собой', be: 'Кава з сабой', en: 'Coffee to go', pl: 'Kawa na wynos', zh: '外带咖啡' },
  'venue.roast.f4': { ru: 'Для работы', be: 'Для працы', en: 'Work-friendly', pl: 'Przyjazne do pracy', zh: '适合工作' },
  'venue.roast.f5': { ru: 'Уютно', be: 'Утульна', en: 'Cozy', pl: 'Przytulnie', zh: '温馨' },
};
