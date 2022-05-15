src/wasm/mjs/findingRoot.mjs: src/wasm/c/findingRoot.c
	emcc --no-entry src/wasm/c/findingRoot.c -o src/wasm/mjs/findingRoot.mjs  \
	  -s ENVIRONMENT='web'  \
	  -s SINGLE_FILE=1  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s EXPORTED_FUNCTIONS='["_findBisection", "_f", "_df", "_bisection", "_newton", "_secant", "_regula", "_findRegulaFalsi", "_findSecant", "_findNewton"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3