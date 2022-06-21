let count = 0;

export const getCount = () => count;
export const increase = () => count++;

/*
nodejs에서 최신 ES 모듈 사용하는 방법
✅ package.json에서  "type": "module" 을 설정한다.
→ 프로젝트 단위로 ES 모듈을 적용할 수 있다.
*/
