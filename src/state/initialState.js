export const initialState = {
   data: [],
   page: window.location.pathname === '/' ? 'home' : window.location.pathname.replace(/^\/(\w+)\/.*/, '$1'),
}

console.log(window.location.pathname.replace(/^\/(\w+)\/.*/, '$1'));