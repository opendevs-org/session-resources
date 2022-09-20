rm -rf package.zip

zip -rq ./package.zip src node_modules

ls -l --block-size=M ./package.zip
