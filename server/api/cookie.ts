export default defineEventHandler(async event => {
    const body=await readBody(event)
    setCookie(event, 'jwt',body.langCookie)
    setCookie(event, 'carts',body.langCookie)
    setCookie(event, 'hiddenInstallPwa',body.langCookie ,{expires:new Date((new Date().getTime()+(30*24*60*60*1000)))})
    setCookie(event, 'pwaInstalled',body.langCookie)

    //  Authorization: auth.logged ? `Bearer ${auth.accessToken}` : ''
})

