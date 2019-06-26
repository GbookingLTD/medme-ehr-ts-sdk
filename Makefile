FILES=src/index.ts

test:
	npm run test

build: build_commonjs build_es5 build_browser

build_commonjs: clean_commonjs
	tsc --module commonjs --target ES5 --outDir dist/cjs ${FILES}

build_es5: clean_es5
	tsc --module es2015 --target ES5 --outDir dist/es5 ${FILES}

build_browser: clean_browser
	tsc --module AMD --target ES5 --outfile dist/browser/bundle.js ${FILES}

web_sample_start:
	python -mSimpleHTTPServer 9900

web_sample_open:
	browse http://localhost:9900/web_sample/index.html

clean_commonjs:
	rm -rf dist/cjs/*

clean_es5:
	rm -rf dist/es5/*

clean_browser:
	rm -rf dist/browser/*

clean:
	rm -rf dist/*

