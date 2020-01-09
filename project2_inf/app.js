const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`start!!! listen on the port ${port}`));

//project1에서는 supervisor를 설치하였음
//project2에서는 이와 같은 기능을 하는 nodemon을 설치함
//-> app에서의 코드변화를 감지하여 자동으로 서버를 재부팅해주는 기능을 함
