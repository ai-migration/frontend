// Configuration for different environments
// 배포 URL: http://3.39.231.225:3000/
// API 서버: http://3.39.231.225:8088 (추정)
export const SERVER_URL = process.env.NODE_ENV === 'test' ? 'http://3.39.231.225:8088' : 'http://3.39.231.225:8088';

export const DEFAULT_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // default = 공지사항 게시판 아이디
export const NOTICE_BBS_ID = "BBSMSTR_AAAAAAAAAAAA"; // 공지사항 게시판 아이디
export const GALLERY_BBS_ID = "BBSMSTR_BBBBBBBBBBBB"; // 갤러리 게시판 아이디
