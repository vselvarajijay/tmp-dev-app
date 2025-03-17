import os
from logging.config import fileConfig

from sqlalchemy import create_engine, pool
from alembic import context
from server.models import Base  # Ensure this is the correct path

# Get the Alembic Config object
config = context.config

# Load logging configuration
if config.config_file_name:
    fileConfig(config.config_file_name)

# Set the database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://vijayselvaraj:password@localhost/testdb")
config.set_main_option("sqlalchemy.url", DATABASE_URL)

# Add your model's MetaData object
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = create_engine(DATABASE_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


# Determine if Alembic should run in offline or online mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
