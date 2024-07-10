let select1Index=0
let select2Index=0
let totalPrice=0
let btnIdx=0

const select1Menu=[
    '',
    '002)위카플리스 후드티 BR',
    '003)위카플리스 후드티 CB'
]

const select2Menu=[
    ['',''],

    [
        {name:'BRICK 090 ◈144346560◈(-59000원)',price:36200},
        {name:'BRICK 090 ◈144346561◈(-59000원)',price:36300}
    ],

    [
        {name:'CARBON BLACK 095 ◈144346567◈(-59000원)',price:36400},
        {name:'CARBON BLACK 100 ◈144346568◈(-59000원)',price:36500}
    ],
]


$(document).ready(function(){
    initSelectBox()
    firstSelectBoxChanged()
    secondSelectBoxChanged()
})

function initSelectBox(){
    $('#select2').attr('disabled',true)
}

function refreshSelectBox(){
    $("#select2").empty()
    $("#select2").append('<option>사이즈</option>')
    $("#select2").attr("disabled",true)
    $("#select1 option:eq(0)").prop("selected",true)
}

function firstSelectBoxChanged(){
    $('#select1').change(function(){
        alert ("select box1 changed")

        const idx=$("#select1 option").index($("#select1 option:selected"))
        select1Index=idx
        alert(idx+"번째 선택")

        if(idx != 0){
            $('#select2').attr('disabled',false)
            $("#select1>option").eq(0).hide()

            $('#select2').empty()
            $("#select2").append("<option>사이즈</option>")
            for(var i=0; i<select2Menu[idx].length; i++){
                const option = $("<option>"+select2Menu[idx][i].name+"</option>")
                $('#select2').append(option)
            }
        }
    })
}

function secondSelectBoxChanged(){
    $('#select2').change(function(){
        alert("select box2 changed!")
  
        const idx=$("#select2 option").index($("#select2 option:selected"))
        select2Index=idx
        alert(idx+"번째 선택")
        const select1Item=select1Menu[select1Index]
        const select2Item=select2Menu[select1Index][select2Index-1].name
        const itemPrice=select2Menu[select1Index][select2Index-1].price
        const full_item_name=select1Item+"+"+select2Item

        addBuyItem(full_item_name,itemPrice)
        itemDesign()
        calTotalPriceAdd(itemPrice)
        refreshSelectBox()
    })
}

function addBuyItem(full_item_name,itemPrice){
    btnIdx++;
    $('#buy-list').append('<div id="item">'+
        '<span id="item-name">'+full_item_name+'</span>'+
        '<span id="item-price">'+itemPrice+'</span>원'+
        '<button id="delBtn'+btnIdx+'"'+'>삭제</button>'
        +'</div>')
    delItem(btnIdx)
}

function delItem(btnIdx){
    $("#delBtn"+btnIdx).click(function(){
        const priceInfo=$(this).parent().find("#item-price").text()
        alert(priceInfo)
        let curTotalPrice=$('#total-price>span').text()
        curTotalPrice -= priceInfo
        $('#total-price>span').text(curTotalPrice)
        $(this).parent().remove()
    });
}

function itemDesign(){
    $("#buy-list>#item>#item-name").css({
        "background-color":"aqua"
    });
    $("#buy-list>#item>#item-price").css({
        "background-color":"indigo",
        "color":"white"
    });
}

function calTotalPriceAdd(itemPrice){
    totalPrice += itemPrice;
    $("#total-price>span").empty();
    $("#total-price>span").text(totalPrice);
}

function calTotalPriceDel(itemPrice){
    totalPrice -= itemPrice;
    $("#total-price>span").empty();
    $("#total-price>span").text(totalPrice);
}