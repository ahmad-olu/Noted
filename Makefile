
.PHONY: run
run:
	@echo starting surreal
	cd /home/r2/Documents/playground/javascript/noted && \
	surreal start --log error --user root --pass root --bind 0.0.0.0:8080 surrealkv:ivvy.db



.PHONY: testMem
testMem:
	@echo starting surreal memory test db
 	surreal start --log trace --user root --pass root --bind 0.0.0.0:8111 memory
