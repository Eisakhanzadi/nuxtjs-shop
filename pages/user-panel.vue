<script setup lang="ts">
const breadcrumbs: { [key: string]: string }[] = [
  {
    url: '/user-panel',
    name: 'حساب کاربری'
  }
]
const {$swal} = useNuxtApp()
const router = useRouter()
const route = useRoute()
const cookie = useCookie('jwt')
function logOut() {
  const swalWithBootstrapButtons = $swal.mixin({
    customClass: {
      confirmButton: "!bg-red-500 !hover:bg-red-300 text-white rounded px-3 py-2 text-sm mx-1",
      cancelButton: "!bg-colore3e3e3 !hover:bg-color-f3 text-color666 rounded px-3 py-2 text-sm mx-1"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "آیا میخواهید خارج شوید؟",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "خیر",
    confirmButtonText: "بله خارج شو !",
  }).then((result) => {
    if (result.isConfirmed) {
      // useAsyncData('logout', () => $fetch(`${baseURL}/customer/logout`, {
      //   server: false,
      //   method: 'POST',
      // })).then(res => {
      //   console.log(res);
      //   getStatusLogin.setlogin(false)
      //   getStatusLogin.setNewCarts([])
      //   getStatusLogin.User = null
        // showUserOption.value = false
        if (route.path.includes('panel') ||
            route.path.includes('club') ||
            route.path.includes('order') ||
            route.path.includes('cart')) {
          router.push('/')
        }
        if (cookie.value) {
          cookie.value = "";
        }
        // const headers = {
        //   authorization: ``,
        //   ...configHeader
        // };
        // globalThis.$fetch = ofetch.create({
        //   headers: headers,
        // });
      // })

    }
  });
}
</script>

<template>
  <section class="">
    <breadcrumb :data="breadcrumbs"/>
    <section class="container mx-auto grid grid-cols-4 h-full gap-5 mt-5 md:mt-10">
      <aside class="col-span-1 h-full bg-white py-10 rounded-xl box-shadow">
        <nav>
          <ul>
            <li>
              <nuxt-link
                  :class="{'active -translate-x-3' :route.name === 'user-panel'}"
                  class="py-2.5 px-5 flex items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm"
                  to="/user-panel">
                <span class="icon"><icons-full-user/></span>
                <span class="text">حساب کاربری</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                  :class="{'active -translate-x-3' :route.name === 'user-panel-locations'}"
                  class="py-2.5 px-5 flex items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm"
                  to="/user-panel/locations">
                <span class="icon"><icons-location/></span>
                <span class="text">لیست آدرس ها</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                  :class="{'active -translate-x-3' :route.name === 'user-panel-orders'}"
                  class="py-2.5 px-5 flex items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm"
                  to="/user-panel/orders">
                <span class="icon"><icons-documnet/></span>
                <span class="text">پیگیری سفارش</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                  :class="{'active -translate-x-3' :route.name === 'user-panel-favorites'}"
                  class="py-2.5 px-5 flex items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm"
                  to="/user-panel/favorites">
                <span class="icon"><icons-heart/></span>
                <span class="text">لیست علاقه مندی ها</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                  :class="{'active -translate-x-3' :route.name === 'user-panel-wallet'}"
                  class="py-2.5 px-5 flex items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm"
                  to="/user-panel/wallet">
                <span class="icon"><icons-wallet/></span>
                <span class="text">کیف پول</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                  :class="{'active -translate-x-3' :route.name === 'user-panel-withdraw'}"
                  class="py-2.5 px-5 flex items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm"
                  to="/user-panel/withdraw">
                <span class="icon"><icons-withdraw/></span>
                <span class="text">برداشت از کیف پول</span>
              </nuxt-link>
            </li>
            <li>
              <button
                  @click.prevent="logOut"
                  class="py-2.5 px-5 flex  items-center gap-1 hover:-translate-x-3 transform transition duration-300 ease-ease text-sm">
                <span class="icon"><icons-exit color="red" class="text-rose-500"/></span>
                <span class="text text-rose-500">خروج از حساب کاربری</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="col-span-3 h-full bg-white p-5 rounded-xl box-shadow">
        <nuxt-page/>
      </main>
    </section>

  </section>
</template>

<style scoped>
a.active{
  background:var(--color-form)
}

</style>