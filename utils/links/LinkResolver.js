import links from '~/utils/links/Links.js'

// این متد وظیفه داره لینک یک صفحه رو از روی لینکیبل ها بدست بیاره
// Config in Links.js file
export default function resolveUrl(linkable_type, linkable_id, slug, link = null) {
  slug = slug ? slug : 'مشاهده'
  if (link !== null) {
    return link;
  }
  const router = {};
  links.forEach((element) => {
    // بعد از پیدا کردن مورد مشابه در روتر کمکی
    if (element.linkable_type == linkable_type) {
      // اگر به پست خاصی اشاره نداشت به لیست مورد نظر برود
      if (linkable_id == null) {
        router.name = element.listRouterName;
      } else {
        // در غیر این صورت وارد جزئیات آن مسیر میشود
        router.name = element.routerName;
        if (element.routerParams != "") {
          if (element.routerSlug != "") {
            // در صورت داشتن پارامتر و اسلاگ به روتر اضافه میشود
            router.params = {
              [element.routerParams]: linkable_id,
              [element.routerSlug]: slug,
            };
          } else {
            // فقط پارامز مورد نظر اضافه میشود
            router.params = {
              [element.routerParams]: linkable_id,
              [element.routerSlug]: '',
            };
          }
        }
        if (element.routerQuery != "") {
          // اگر کوئری هم داشت به روتر اضافه کن
          router.query = {
            [element.routerQuery]: linkable_id,
          };
        }
      }
    }
  });
  // مسیر درست شده را برمیگرداند
  return router;
}
