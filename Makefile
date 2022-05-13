src/bisection.mjs: src/wasm/c/bisection.c
	emcc --no-entry src/wasm/c/bisection.c -o src/wasm/mjs/bisection.mjs  \
	  -s ENVIRONMENT='web'  \
	  -s SINGLE_FILE=1  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s EXPORTED_FUNCTIONS='["_findBisection", "_f", "_bisection"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3