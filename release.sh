#! /bin/bash

CMD(){
    echo "[INFO] ===> " "$@"
    eval "$@"
}

CMD git checkout release &&\
CMD git merge master &&\
CMD node_modules/.bin/tsc &&\
CMD npm test || exit 1

CMD git add dist/*

CMD git commit -m "'release'" &&\
CMD git push origin release

git checkout master
