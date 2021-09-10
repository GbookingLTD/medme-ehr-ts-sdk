FILES=src/index.ts

auth_server_run:
	PORT=4321 EHR_HOST=localhost EHR_PORT=9999 EHR_PATH=/ \
		node tests/authServer/server.js

auth_server_test:
	curl http://localhost:4321 -X POST -H "Content-Type: application/json" \
		-d '{"jsonrpc":"2.0","id":1,"method":"auth.exchange_token","params":[],"cred":{"user":"1","token":"test"}}'

test:
	./node_modules/.bin/mocha -r ts-node/register tests/*.test.ts

test_appointment:
	./node_modules/.bin/mocha -r ts-node/register tests/appointment.test.ts

test_appointmentResult:
		./node_modules/.bin/mocha -r ts-node/register tests/appointmentResult.test.ts

test_prescription:
		./node_modules/.bin/mocha -r ts-node/register tests/prescription.test.ts

test_diagnosticReports:
		./node_modules/.bin/mocha -r ts-node/register tests/diagnosticReport.test.ts

test_auth:
	./node_modules/.bin/mocha -r ts-node/register tests/auth.test.ts

test_formatters:
	./node_modules/.bin/mocha -r ts-node/register tests/formatters.test.ts

test_rpc:
	./node_modules/.bin/mocha -r ts-node/register tests/rpc.test.ts

build: build_commonjs build_es5 build_browser

rebuild: rebuild_commonjs rebuild_es5 rebuild_browser

rebuild_commonjs: clean_commonjs build_commonjs
rebuild_es5: clean_es5 build_es5
rebuild_browser: clean_browser build_browser

build_commonjs:
	tsc --module commonjs --target ES5 --outDir dist/cjs ${FILES}

build_es5:
	tsc --module es2015 --declaration true --target ES5 --outDir dist/es5 ${FILES}

build_browser:
	tsc --module AMD --target ES5 --outfile dist/browser/bundle.js ${FILES}

clean_commonjs:
	rm -rf dist/cjs/*

clean_es5:
	rm -rf dist/es5/*

clean_browser:
	rm -rf dist/browser/*

clean:
	rm -rf dist/*

dev:
	./dev.sh
