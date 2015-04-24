browserify:
	browserify --ignore cla6 client > client/cla6-base.js
	uglifyjs client/cla6-base.js > client/cla6-base.min.js

test:
	mocha "test/index.js" --timeout 2000 --reporter nyan

.PHONY: test