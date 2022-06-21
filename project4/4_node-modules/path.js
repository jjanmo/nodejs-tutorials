const path = require('path');

console.log(__dirname);
console.log(__filename);

// 🙏 운영체제별로 콘솔에 찍히는 표기법이 다름
// Mac : /Users/jjanmo/Documents/MyProjects/Node/nodejs-tutorials/project4/4_node-modules/path.js
// Window : C:\\temp\\myfile.html

console.log(path.sep); // path의 경로 구분자 - Mac 에서는 : /
console.log(path.delimiter); // process.env.PATH의 환경변수 구분자 - Mac에서는 : / Window에서는 ;
console.log(process.env.PATH.split(path.delimiter));

// basename
console.log(path.basename(__filename));
console.log(path.basename(__filename, '.js'));

// dirname
console.log(path.dirname(__filename));

// extension
console.log(path.extname(__filename)); // 현재 파일의 확장자명

// parse
const parsed = path.parse(__filename); // 현재 파일 경로를 여러가지 속성(root, dir, base, ext, name)으로 파싱함
console.log(parsed);
const str = path.format(parsed); // 파싱전 상태(기존의 문자열 형태의 경로)로 변환 가능
console.log(str);

// isAbsolute
console.log('isAbolute ?', path.isAbsolute(__dirname));
console.log('isAbolute ?', path.isAbsolute('../../'));

// normalize
// 잘못된 경우 ex //// 이런거 자동으로 수정 but 중간에 낀 상대경로는 인식함
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
console.log(path.normalize('/foo////../sub')); // 상대경로는 인식? /foo/../sub 로 인식하여 변경됨 → 최종 /sub
console.log(path.normalize('/foo/////sub')); // /foo/sub

// join
console.log(__dirname + '/' + 'image'); // ❌ Window에선 잘못된 경로(path.sep 이 다름)
console.log(__dirname + path.sep + 'image'); // ⭕️
console.log(path.join(__dirname, 'image')); // 👍
