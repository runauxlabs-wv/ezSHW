$(document).ready(function () {
    $.getJSON('./leaflet.json', function (data) {
        $("#kind1").next().text(data.paperInfo[0].kind);

        // 종이사이즈 이름 객체 개수만큼 복제하여 생성하기
        const PAPER = data.paperInfo;
        const max00 = PAPER.length - 1; // 최초 라디오버튼은 생성되어있으니 복제본제외로 갯수 설정
        for (let i = 0; i < max00; i++) {
            const cloneEl = $("#psizeList > li:last").clone(true); //마지막 li복제
            $(cloneEl).children('input').attr("id", PAPER[i + 1].size.id);
            $(cloneEl).children('label').attr("for", PAPER[i + 1].size.id); //라디오버튼 옵션설정
            $(cloneEl).children('label').text(PAPER[i + 1].size.name); //라벨텍스트 설정
            $(cloneEl).appendTo("#psizeList"); //ul에 붙이기
        }
        
        // 종이재질 복제함수
        function thin(index) {
            $("#thinList > li:gt(0)").remove();
            const WEIGHT = data.paperInfo[index].size.weight;
            const max01 = WEIGHT.length - 1; // 최초 라디오버튼은 생성되어있으니 복제본제외로 갯수 설정
            for (let i = 0; i < max01; i++) {
                const cloneEl = $("#thinList > li:last").clone(true); //마지막 li복제
                $(cloneEl).children('input').attr("id", WEIGHT[i + 1].id);
                $(cloneEl).children('label').attr("for", WEIGHT[i + 1].id); //라디오버튼 옵션설정
                $(cloneEl).children('label').text(WEIGHT[i + 1].list); //라벨텍스트 설정
                $(cloneEl).appendTo("#thinList"); //ul에 붙이기
            }
            return;
        }

        // 세자리 콤마 함수
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        var totalprice;
        var vattotal;
        var totalvarprice;
        var sum = 0;

        //종이 사이즈를 클릭 체인지 시 각 재질이 나온다
        $("#a4size,#a5size,#b16size,#b32size,#b64size,#b24size,#b48size,#jang32size,#nonst").on("click change",function(){
            $("#quantity option:eq(0)").attr("selected", "selected");
            var radioIndexsize = $("input[name='size']:checked").parent().index();
            thin(radioIndexsize)

            //수량 옵션
            $("#quantity").show();
            $("#num").show();
            $("#quantity1").hide();
            $("#quantity2").hide();

            //첫번째 라디오 버튼이 강제선택되게
            $("input#100Side").trigger("click");

            //다른 사이즈 선택하면 수량,건수 처음 위치로 돌아가기
            $("input[name='size']").click(function () {
                $("#quantity option:eq(0)").prop("selected", true);
                $("#num option:eq(0)").prop("selected", true);
            });

            //재질 선택시 금액이 보이게
            $("input[name='weight'], #quantity, #num").on("click change",function(){
                var radioIndexthin = $("input[name='weight']:checked").parent().index();
                var papermoney = data.paperInfo[radioIndexsize].size.weight[radioIndexthin].money.price
                //수량 건수 선택시 금액 증가
                var quselect = $("#quantity").val();
                var numselect = $("#num").val();
                var quamount = papermoney * quselect * numselect;
                totalprice = quamount + sum;
                vattotal = totalprice * 0.1;
                totalvarprice = totalprice + vattotal;
                $("#unit").next("label").text(`${numberWithCommas(quamount)}원`);
                $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
                $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
                $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);

                //0.5연 - 새로고침시 보이는 금액
                $(this).val();
                if($("#quantity").val() == 0){
                    quamount = papermoney - 10000;
                    totalprice = quamount + sum;
                    vattotal = totalprice * 0.1;
                    totalvarprice = totalprice + vattotal;
                    $("#unit").next("label").text(`${numberWithCommas(quamount)}원`);
                    $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
                    $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
                    $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
                }
            });

            //재단사이즈,작업사이즈 값 넣기
            var w = data.paperInfo[radioIndexsize].size.valueX.wsize
            var h = data.paperInfo[radioIndexsize].size.valueY.hsize
            $("#width").val(w);
            $("#height").val(h);
            $("#width3").val(w + 3);
            $("#height3").val(h + 3);
            
            //모달팝업
            $("#nonst").click(function(){
                $(".popup").show();
            })
            $(".mclose").click(function() {
                $(".popup").hide();
            });
            
            //텍스트박스 비활성화
            $("input[type=text]").attr("readonly", true);
            //비규격 텍스트박스 활성화
            if($(this).attr("id") == "nonst"){
                $("input[type=text]").attr("readonly", false);
                $("#width").val("");
                $("#height").val("");
                $("#width3").val("");
                $("#height3").val("");

                //비규격 1연부터 보이게
                $("#quantity1").show();
                $("#quantity").hide();
                $("#quantity2").hide();

                $("#unit").next("label").text("0원");
                $("#vat").next("label").text("0원");
                $("#totalprice").next("label").text("0원");
                $("#totalvarprice").next("label").text("0원");
                quamount = 0;
                
                //비규격 사이즈 입력에 따라 금액변동
                var papermoney = '';
                $("input[type=text]").on('keyup', function(){
                    if($("#height").val() <= 39){
                        papermoney = 0
                        orderprice();
                    } else if ($("#width").val() <= 39){
                        papermoney = 0 
                        orderprice(); 
                    } else if($("#height").val() >= 40 && $("#height").val() <= 210){
                        papermoney = data.paperInfo[4].size.weight[0].money.price;
                        orderprice();
                        $("#100Side, #100BSide, #150Side, #150BSide, #quantity1, #num").on("click change",function(){
                            radioIndexthin = $("input[name='weight']:checked").parent().index();
                            var price16 = data.paperInfo[4].size.weight[radioIndexthin].money.price;
                            papermoney = price16;
                            quselect = $("#quantity1").val();
                            numselect = $("#num").val();
                            papermoney = papermoney * quselect * numselect;
                            orderprice();
                        });
                    } else if($("#height").val() >= 211 && $("#height").val() <= 297){
                        papermoney = data.paperInfo[0].size.weight[0].money.price;
                        orderprice();
                        $("#100Side, #100BSide, #150Side, #150BSide, #quantity1, #num").on("click change",function(){
                            radioIndexthin = $("input[name='weight']:checked").parent().index();
                            var pricea4 = data.paperInfo[0].size.weight[radioIndexthin].money.price;
                            papermoney = pricea4;
                            quselect = $("#quantity1").val();
                            numselect = $("#num").val();
                            papermoney = papermoney * quselect * numselect;
                            orderprice();
                        });
                    } else if($("#height").val() >= 298 && $("#height").val() <= 594){
                        papermoney = data.paperInfo[2].size.weight[0].money.price;
                        orderprice();
                        $("#100Side, #100BSide, #150Side, #150BSide, #quantity1, #num").on("click change",function(){
                            radioIndexthin = $("input[name='weight']:checked").parent().index();
                            var pricea3 = data.paperInfo[2].size.weight[radioIndexthin].money.price;
                            papermoney = pricea3;
                            quselect = $("#quantity1").val();
                            numselect = $("#num").val();
                            papermoney = papermoney * quselect * numselect;
                            orderprice();
                        });
                    } else {
                        papermoney = 0
                        orderprice();
                    }    
                });

                //중복되는 금액을 함수처리
                function orderprice(){
                    totalprice = papermoney + sum;
                    vattotal = totalprice * 0.1;
                    totalvarprice = totalprice + vattotal;
                    console.log($("#num").val());
                    $("#unit").next("label").text(`${numberWithCommas(papermoney)}원`);
                    $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
                    $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
                    $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
                }

                //다른 재질 선택하면 수량,건수 처음 위치로 돌아가기
                $("input[name='weight']").click(function () {
                    $("#quantity1 option:eq(0)").prop("selected", true);
                    $("#num option:eq(0)").prop("selected", true);
                });

                //재단사이즈 입력하면 자동으로 작업사이즈 입력
                var sum2 = parseInt(0);
                $('input[id=width]').on('keyup', function() {
                    sum2 = parseInt(0);
                    this.value = this.value.replace(/[^0-9]/g,'');
                    $('input[id=width]').each(function() {
                        if(!isNaN(this.value) && this.value !== '') {
                            sum2 += parseInt(this.value);
                        } else {
                            return 0;
                        }
                        $('input[id=width3]').val(sum2+3);
                    })
                })
                $('input[id=height]').on('keyup', function() {
                    sum2 = parseInt(0);
                    this.value = this.value.replace(/[^0-9]/g,'');
                    $('input[id=height]').each(function() {
                        if(!isNaN(this.value) && this.value !== '') {
                            sum2 += parseInt(this.value);
                        } else {
                            return 0;
                        }
                        $('input[id=height3]').val(sum2+3);
                    })
                })
            }
        });

        //a3, 8절, 장16절 - 1연부터 시작
        $("input[id=a3size], input[id=b8size],input[id=jang16size]").on("click change",function(){
            $("#quantity1 option:eq(0)").attr("selected", "selected");
            var radioIndexsize = $("input[name='size']:checked").parent().index();
            thin(radioIndexsize);

            //다른 수량 셀렉트박스 숨기기
            $("#quantity").hide();
            $("#quantity2").hide();
            $("#quantity1").show();

            //다른 재질 선택하면 수량,건수 처음 위치로 돌아가기
            $("input[name='size']").click(function () {
                $("#quantity1 option:eq(0)").prop("selected", true);
                $("#num option:eq(0)").prop("selected", true);
            });

            //재단사이즈,작업사이즈 값 넣기
            var w = data.paperInfo[radioIndexsize].size.valueX.wsize
            var h = data.paperInfo[radioIndexsize].size.valueY.hsize
            $("#width").val(w);
            $("#height").val(h);
            $("#width3").val(w + 3);
            $("#height3").val(h + 3);

            //첫번째 라디오 버튼이 강제선택되게
            $("input#100Side").trigger("click");

            //a3, 8절, 장16절, a4(150아트), a5(150아트)는 1연이 기본
            $("input[name='weight'], #quantity1, #num").on("click change",function(){
                var radioIndexthin = $("input[name='weight']:checked").parent().index();
                var papermoney = data.paperInfo[radioIndexsize].size.weight[radioIndexthin].money.price
                var quselect1 = $("#quantity1").val();
                var numselect = $("#num").val();
                var quamount = papermoney * quselect1 * numselect;
                totalprice = quamount + sum;
                vattotal = totalprice * 0.1;
                totalvarprice = totalprice + vattotal;
                $("#unit").next("label").text(`${numberWithCommas(quamount)}원`);
                $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
                $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
                $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
            });
        });


        //a2, 4절 - 4연부터 시작
        $("input[id=a2size], input[id=b4size]").on("click change",function(){
            $("#quantity2 option:eq(0)").attr("selected", "selected");
            var radioIndexsize = $("input[name='size']:checked").parent().index();
            thin(radioIndexsize)

            //다른 수량 셀렉트박스 숨기기
            $("#quantity").hide();
            $("#quantity1").hide();
            $("#quantity2").show();


            //다른 재질 선택하면 수량,건수 처음 위치로 돌아가기
            $("input[name='size']").click(function () {
                $("#quantity2 option:eq(0)").prop("selected", true);
                $("#num option:eq(0)").prop("selected", true);
            });

            //재단사이즈,작업사이즈 값 넣기
            var w = data.paperInfo[radioIndexsize].size.valueX.wsize
            var h = data.paperInfo[radioIndexsize].size.valueY.hsize
            $("#width").val(w);
            $("#height").val(h);
            $("#width3").val(w + 3);
            $("#height3").val(h + 3);

            //첫번째 라디오 버튼이 강제선택되게
            $("input#100Side").trigger("click");

            $("input[name='weight'], #quantity2, #num").on("click change",function(){
                var radioIndexthin = $("input[name='weight']:checked").parent().index();
                var papermoney = data.paperInfo[radioIndexsize].size.weight[radioIndexthin].money.price
                var quselect = ($("#quantity2").val()) / 4;
                var numselect = $("#num").val();
                var quamount = papermoney * quselect * numselect;
                totalprice = quamount + sum;
                vattotal = totalprice * 0.1;
                totalvarprice = totalprice + vattotal;
                $("#unit").next("label").text(`${numberWithCommas(quamount)}원`);
                $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
                $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
                $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
            });
        });


        //첫번째 라디오 버튼을 강제선택(트리거)
        $("input#a4size").trigger("click",function(){
            thin(0)
        });
        
        //수량,건수 옵션값 자동
        $(function(){
            var $select = $("#quantity");
            for (i=1;i<=100;i++){
                $select.append($('<option></option>').val(i).html(i+'연'))
            }
            var $select = $("#quantity1");
            for (i=2;i<=100;i++){
                $select.append($('<option></option>').val(i).html(i+'연'))
            }
            var $select = $("#num");
            for (i=2;i<=100;i++){
                $select.append($('<option></option>').val(i).html(i+'건'))
            }
            var $select = $("#quantity2");
            for (var i = 0; i <= 100; i++) {
                if (i % 4 == 0 && i !== 0) {
                    $select.append($('<option></option>').val(i).html(i+'연'))
                }
            }
        });

        //후가공 클릭시 보이기 셀렉트 보이기
        $(".postlist > a:eq(0)").click(function () {
            $(".postpro1").toggleClass("on");
        });
        $(".postlist > a:eq(1)").click(function () {
            $(".postpro2").toggleClass("on");
        });
        $(".postlist > a:eq(2)").click(function () {
            $(".postpro3").toggleClass("on");
        });
        //다른 재질 선택 시 후가공 초기화
        $("input[name='size']").click(function () {
            $(".postpro1,.postpro2, .postpro3").removeClass("on");
            $("#cut option:eq(0), #fold option:eq(0), #dotted option:eq(0)").prop("selected", true);
            $("#post").next("label").text("0원");
            sum = 0;
        });

        //후가공 select 옵션넣기
        var postcut = data.postprocss[0].post.cutlist
        var postfold = data.postprocss[1].post.foldlist
        var postdot = data.postprocss[2].post.dotlist
        //재단 select option
        $.each(postcut, function(index, value){
            $("#cut").append('<option value="'+ index +'">' + value.cutListT + '</option>');
        });
        //접지 select option
        $.each(postfold, function(index, value){
            $("#fold").append('<option value="'+ index +'">' + value.foldListT + '</option>');
        });
        //미싱 select option
        $.each(postdot, function(index, value){
            $("#dotted").append('<option value="'+ index +'">' + value.dotListT + '</option>');
        });

        //후가공 select option 선택 시 금액표시
        //data-* 값 추출하여 변수대입
        var postcut = $("#post").data("cut")
        var postfold = $("#post").data("fold")
        var postdot = $("#post").data("dot")
        var sum;
        // 후가공 기본설정 안되어있으면 data값 0대입
        if(postcut === undefined){
            $("#post").data("cut", 0);
            postcut = $("#post").data("cut");
        }
        if(postfold === undefined){
            $("#post").data("fold", 0);
            postfold = $("#post").data("fold");
        }
        if(postdot === undefined){
            $("#post").data("postdot", 0);
            postdot = $("#post").data("postdot");
        }
        $("#cut").on("change", function () {
            $("#post").data("cut", 0); // 초기화
            var cutlistIndex = $("#cut").val(); //재단 옵션값 선택시 값 추출하여 변수대입
            var cutmoney = 	data.postprocss[0].post.cutlist[cutlistIndex].money.price; //변수를 인덱스로 하는 json금액추출
            $("#post").data("cut", cutmoney) //data-cut으로 기록
            postcut = $("#post").data("cut") //변수에 기록한 값 재설정
            sum = postcut + postfold + postdot;
            $("#post").next("label").text(`${numberWithCommas(sum)}원`);
            cutvat = postcut * 0.1;
            totalprice = totalprice + postcut;
            vattotal = vattotal + cutvat;
            totalvarprice = totalprice + vattotal;
            //기본금액
            $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
            $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
            $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
        });

        $("#fold").on("change", function () {
            $("#post").data("fold", 0); // 초기화
            var foldlistIndex = $("#fold").val();
            var foldmoney = data.postprocss[1].post.foldlist[foldlistIndex].money.price
            $("#post").data("fold", foldmoney) //data-fold로 기록
            postfold = $("#post").data("fold") //변수에 기록한 값 재설정
            sum = postcut + postfold + postdot;
            $("#post").next("label").text(`${numberWithCommas(sum)}원`);
            foldvat = postfold * 0.1;
            totalprice = totalprice + postfold;
            vattotal = vattotal + foldvat;
            totalvarprice = totalprice + vattotal;
            //기본금액
            $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
            $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
            $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
        });

        $("#dotted").on("change", function () {
            $("#post").data("dot", 0); // 초기화
            var dotlistIndex = $("#dotted").val();
            var dotmoney = 	data.postprocss[2].post.dotlist[dotlistIndex].money.price
            $("#post").data("dot", dotmoney) //data-dot으로 기록
            postdot = $("#post").data("dot") //변수에 기록한 값 재설정
            sum = postcut + postfold + postdot;
            $("#post").next("label").text(`${numberWithCommas(sum)}원`);
            dotvat = postdot * 0.1;
            totalprice = totalprice + postdot;
            vattotal = vattotal + dotvat;
            totalvarprice = totalprice + vattotal;
            
            $("#vat").next("label").text(`${numberWithCommas(vattotal)}원`);
            $("#totalprice").next("label").text(`${numberWithCommas(totalprice)}원`);
            $("#totalvarprice").next("label").text(`${numberWithCommas(totalvarprice)}원`);
        });
    });

    
});