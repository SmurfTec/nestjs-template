# Assuming $DATABASE_HOST, $SUPERUSER, $SUPERUSER_PASSWORD, $DATABASE_NAME are set

# STEP 1: Execute the administrative setup script using the SUPERUSER
psql.exe -U postgres -d sellerswift -f ./db_setup/db_setup.sql

# STEP 2: Run application schema migrations using the standard APP USER
# This command should now succeed as permissions and extensions are in place
npm run migration:up