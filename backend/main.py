import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy import text
from database import engine, Base
from dotenv import load_dotenv

from routers import auth as auth_router
from routers import users as users_router
from routers import favorites as favorites_router
from routers import bookings as bookings_router
from routers import reviews as reviews_router
from routers import admin as admin_router
from routers import messages as messages_router

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Rate limiter: лимиты по IP-адресу
limiter = Limiter(key_func=get_remote_address)

# Создаем таблицы
Base.metadata.create_all(bind=engine)

try:
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS photos TEXT"))
        conn.execute(text("ALTER TABLE reviews ADD COLUMN IF NOT EXISTS branch_id VARCHAR(50)"))
        try:
            conn.execute(text("ALTER TABLE reviews DROP COLUMN IF EXISTS branch_address"))
        except Exception:
            pass
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE"))
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS admin_code VARCHAR(10)"))
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS admin_code_expires TIMESTAMP WITH TIME ZONE"))
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT TRUE"))
        conn.execute(text("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(64)"))
        try:
            conn.execute(text("ALTER TABLE bookings ALTER COLUMN date TYPE TIMESTAMP WITH TIME ZONE USING date::TIMESTAMP WITH TIME ZONE"))
        except Exception:
            pass
        conn.commit()
except Exception as e:
    logger.warning(f"Migration warning: {e}")


app = FastAPI(
    title="Minsk Gastro Guide API",
    description="Backend для путеводителя по заведениям Минска",
    version="1.0.0"
)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://praktika2-eta.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(users_router.router)
app.include_router(favorites_router.router)
app.include_router(bookings_router.router)
app.include_router(reviews_router.router)
app.include_router(admin_router.router)
app.include_router(messages_router.router)


@app.get("/")
def read_root():
    return {"status": "success", "message": "API работает!"}
