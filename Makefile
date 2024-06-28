# Makefile to start Node.js server and React client

.PHONY: install start-server start-client start

install:
	@echo "Installing dependencies..."
	cd server && npm install
	cd client && npm install

start-server:
	@echo "Starting Node.js server..."
	cd server && node index.js

start-client:
	@echo "Starting React client..."
	cd client && npm start

start:
	@echo "Starting both Node.js server and React client..."
	make start-server & make start-client
