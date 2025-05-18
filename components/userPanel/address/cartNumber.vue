<!-- card-banck-inputs.vue -->
<script setup>
// import makeArry from "~/utils/errorString.js"
// import conv2EnNum from "~/utils/persionNum.js"
onMounted(()=>{
  setCardBank()
})
let props=defineProps({
  cardBanck:{
    type:String,
    default:""
  }
})


const emit=defineEmits("inputValue")

let cartInput1 = ref(null)
let cartInput2 = ref(null)
let cartInput3 = ref(null)
let cartInput4 = ref(null)
function setCardBank(){
  console.log(props.cardBanck);
  if(props.cardBanck.length==16){
    cartInput1.value=props.cardBanck.slice(0,4)
    cartInput2.value=props.cardBanck.slice(4,8)
    cartInput3.value=props.cardBanck.slice(8,12)
    cartInput4.value=props.cardBanck.slice(12,16)
  }
}
let code = ref(null)
const inputs = [
  {
    inputVariable: cartInput1,
    id: "input1"
  },
  {
    inputVariable: cartInput2,
    id: "input2"

  },
  {
    inputVariable: cartInput3,
    id: "input3"

  },
  {
    inputVariable: cartInput4,
    id: "input4"

  }



]

function validateToken() {


  let weHaveError = false;
  inputs.every((input) => {
    if (!input.inputVariable.value) {
      document.getElementById(input.id).classList.add("errorInput")

      weHaveError = true;
      return false
    } else {
      return true;
    }
  })

  if (weHaveError) {
    return false;
  }

  // code.value = conv2EnNum(cartInput1.value + cartInput2.value + cartInput3.value + cartInput4.value)
  emit("inputValue",{'cardNumber':code.value})

}
function changeInput(event) {
  let index = ref(null)
  index.value = +event.target.id.slice(5)

  if (((event.which < 48 && event.which > 57) && (event.which < 96 && event.which > 105)) && event.keyCode != 8 && event.keyCode != 9) {
    event.preventDefault();
  } else {

    if (index.value > 1 && event.code == "Backspace") {
      if (event.target.value.length == 0) {

        document.getElementById(`input${index.value - 1}`).focus()
      }

    } else {
      if (event.target.value && event.target.id != "input4") {

        if (event.target.value.length >= 4) {
          document.getElementById(`input${index.value + 1}`).focus()
        }
      } else {
        // code.value = conv2EnNum(cartInput1.value + cartInput2.value + cartInput3.value + cartInput4.value)
        emit("inputValue",{'cardNumber':code.value})


      }

    }
  }

}
function validateForm(e) {
  let input = document.getElementById(e.target.id)
  if (input.value == "") {
    input.classList.add("errorInput")


    return false
  } else {
    input.classList.remove("errorInput")



  }

}
function changeValue(){
  // code.value = conv2EnNum(cartInput1.value + cartInput2.value + cartInput3.value + cartInput4.value)
  emit("inputValue",{'cardNumber':code.value})
}
</script>
<template>
  <div class=" inputsVerify   w-full flex flex-row-reverse items-center justify-between ">
    <input type="text" maxlength="4" placeholder="- - - -" @blur="validateForm" @keyup="changeInput" @input="changeValue"
           v-model="cartInput1"
           class="verifyCode  border-input text-color444 bg-eai  px-3 py-2 outline-0 font-regular-fa-num "
           id="input1" >
    <input type="text" maxlength="4" placeholder="- - - -" @blur="validateForm" @keyup="changeInput" @input="changeValue"
           v-model="cartInput2"
           class="verifyCode  border-input text-color444 bg-eai  px-3 py-2 outline-0 font-regular-fa-num "
           id="input2">
    <input type="text" maxlength="4" placeholder="- - - -" @blur="validateForm" @keyup="changeInput" @input="changeValue"
           v-model="cartInput3"
           class="verifyCode  border-input text-color444 bg-eai  px-3 py-2 outline-0 font-regular-fa-num "
           id="input3">
    <input type="text" maxlength="4" placeholder="- - - -" @blur="validateForm" @keyup="changeInput" @input="changeValue"
           v-model="cartInput4"
           class="verifyCode  border-input text-color444 bg-eai  px-3 py-2 outline-0 font-regular-fa-num "
           id="input4">
  </div>
</template>
<style scoped>
.verifyCode {
  text-align: center;
  flex-grow: 1;
  width: 50px;
}

.errorInput {
  border: unset;
}
</style>
