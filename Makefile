wasm:
	emcc --no-entry src/wasm/c/findingIntegral.c -o src/wasm/mjs/findingIntegral.mjs  \
	  -s ENVIRONMENT='web'  \
	  -s SINGLE_FILE=1  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s EXPORTED_FUNCTIONS='["_f", "_df", "_reimann", "_findReimann", "_trapezoid", "_findTrapezoid", "_simpson", "_findSimpson", "_timeSpentSimpson", "_timeSpentTrapezoid", "_timeSpentReimann"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3
	emcc --no-entry src/wasm/c/findingRoot.c -o src/wasm/mjs/findingRoot.mjs  \
	  -s ENVIRONMENT='web'  \
	  -s SINGLE_FILE=1  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s EXPORTED_FUNCTIONS='["_findBisection", "_f", "_df", "_bisection", "_newton", "_secant", "_regula", "_findRegulaFalsi", "_findSecant", "_findNewton", "_timeSpentBisection", "_timeSpentNewton", "_timeSpentSecant", "_timeSpentRegulaFalsi"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3