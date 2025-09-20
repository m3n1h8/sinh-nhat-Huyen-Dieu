const gifma= new Image()
    gifma.src="gif dọa ma.gif"
    gifma.onload=()=>console.log("dã load xong gif ma")

const params = new URLSearchParams(window.location.search)
  const id=params.get("id")

// const id = "68711c223497bd4cad9af280";
    const list = [
      { content: "Bạn đã chọn gối ru ngủ tự động: cứ nằm xuống là nó hát 'Chúc mừng sinh nhật' suốt đêm không tắt được.", srcImg: "" },
      { content: "Bạn đã chọn đồng hồ báo thức thông minh: chỉ có mỗi một chế độ: reo lúc... 3 giờ sáng.", srcImg: "" },
      { content: "Bạn đã chọn thẻ giảm giá 100%: dùng được mọi nơi nhưng chỉ áp dụng vào ngày hôm qua.", srcImg: "" },
      { content: "Bạn đã chọn nến chống thổi: thổi hoài không tắt, càng thổi sàng sáng hơn.", srcImg: "" }
    ];
    let age=17;
    let birthday = "2009-07-14"; 
    let real= false;

    let putData = 0

    function getData() {
        console.log("đang getdata lần đầu")
      fetch(`https://api.jsonbin.io/v3/b/${id}/latest`, {
        method: "GET",
        headers: { "X-Access-Key": "$2a$10$jcTFWdrVTyEvPPqaOa/j9OURzv/IbGEHkQ/RWrfqvPah7kTjEWyX." }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Dữ liệu đã được lấy:", data);
        putData= data.record
        console.log(putData)


        const thay= ['title','h1-page1', 'h1-page2', 'page2-error', 'h1-page3', 'content-page5'];
        thay.forEach((id,index) => {
          document.getElementById(id).innerHTML=data.record.listcontent[index]||document.getElementById(id).innerHTML;
        ;})

        age = data.record.age||age;
        console.log("Tuổi của bạn là:", age);

        birthday = data.record.birthday||birthday;
        console.log("Ngày sinh của bạn là:", birthday);

        if(data.record.real==true){
          console.log("đây là khách hàng true")
          real= true;
          if (data.record.quadachon == "") {
          console.log("Chưa chọn quà");
          return;
        }
          document.querySelector(".page6d").innerHTML = `
          <h1>Món quà cho người đặc biệt!</h1>
          <p class="content">${list[data.record.quadachon - 1].content}</p>
          <div class="buttons">
            <button class="back-btn" onclick="back('6d',4)" aria-label="Quay lại">Quay lại</button>
          </div>`;
        }  
      })
      .catch(err => console.error("Có lỗi:", err));
    }
    getData();



    AOS.init({ duration: 800, once: true });

    // Confetti Effect
    function launchConfetti() {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ffe4e6', '#fff8e1']
      });
    }

   
    // Cake and Fire Interaction
     const time = document.querySelector(".time");
     const fire = document.getElementById("fire");
     const page6b_h1 = document.getElementById("page6b-h1");


    function wish() {

      fire.style.display = "none"; // Ẩn ngọn lửa khi nhấn vào bánh
      launchConfetti()
      page6b_h1.innerHTML = "Cầu mong cho điều ước đó thành hiện thực!";
    }
    // Music Control
    const audio= document.querySelector("audio");
    const iconplayMusic = document.getElementById("iconplay-music");
    const start_btn= document.querySelector(".start");

    iconplayMusic.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        iconplayMusic.innerHTML = `<ion-icon name="pause-circle-outline" class="quay"></ion-icon>`;
      } else {
        audio.pause();
        iconplayMusic.innerHTML = `<ion-icon name="play-circle-outline"></ion-icon>`;
      }
    });
    start_btn.addEventListener("click", () => {
      audio.play();
      iconplayMusic.innerHTML = `<ion-icon name="pause-circle-outline" class="quay"></ion-icon>`;})

    // API Data


    function  patchData(num) {
      putData.quadachon=num
     // const newData = { quadachon: num };
      fetch(`https://api.jsonbin.io/v3/b/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "$2a$10$jcTFWdrVTyEvPPqaOa/j9OURzv/IbGEHkQ/RWrfqvPah7kTjEWyX.",

        },
        body: JSON.stringify(putData)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Có lỗi:", err));
    }
    
    // Surprise Image Effect
    function doaMa() {
      document.getElementById("anh-ma").src = gifma.src ;
    }

    // Navigation
    function next(thisNum,nextNum) {
        const currentPage = document.querySelector(`.page${thisNum}`);
        const nextPage = document.querySelector(`.page${nextNum}`);
        if( thisNum === 2 && age!="none"  && document.getElementById("page2-qes").value != age) {
          document.getElementById("page2-error").style.display = "block";
          return;
        } 
        else {
          document.getElementById("page2-error").style.display = "none";
          
        }
         if( thisNum === 5 && birthday!='none' && document.getElementById("page5-qes").value != birthday) {
          document.getElementById("page5-error").style.display = "block";
          return;
        }else {
          document.getElementById("page5-error").style.display = "none";
        }

        currentPage.style.display = "none";
        nextPage.style.display = "block";
        launchConfetti(); // Confetti khi chuyển trang
      }

    function back(thisNum,backNum) { 
        if( thisNum == 7 && real==true){
            getData()
        }
        if(backNum==1){
          document.querySelector(".page1").style.display = "block";
          document.querySelector(".page2").style.display = "none";
          document.querySelector(".page3").style.display = "none";
          document.querySelector(".page4").style.display = "none";
          document.querySelector(".page5").style.display = "none";
          document.querySelector(".page6a").style.display = "none";
          document.querySelector(".page6b").style.display = "none";
          document.querySelector(".page6c").style.display = "none";
          document.querySelector(".page6d").style.display = "none";
          document.querySelector(".page7").style.display = "none";
          return
        }

      document.querySelectorAll("video").forEach(video => video.pause());
      const currentPage = document.querySelector(`.page${thisNum}`);
      const backPage = document.querySelector(`.page${backNum}`);
      currentPage.style.display = "none";
      backPage.style.display = "block";
    }



    // Gift Selection
    document.querySelectorAll(".qua").forEach((qua, index) => {
      qua.addEventListener("click", () => {
        document.querySelector(".page6d").style.display = "none";
        document.querySelector(".page7").style.display = "block";
        document.querySelector(".page7").innerHTML = `
          <h1>Chúc mừng người đặc biệt!</h1>
          <p class="content">${list[index].content}</p>
          ${list[index].srcImg ? `<img src="${list[index].srcImg}" alt="Quà đã chọn" style="width: 100%; border-radius: 8px;" loading="lazy">` : ""}
          <div class="buttons">
            <button class="back-btn" onclick="back(7,4)" aria-label="Quay lại">Quay lại</button>
          </div>`;

          document.querySelector(".page6d").innerHTML=`
          <h1>Chúc mừng người đặc biệt!</h1>
          <p class="content">${list[index].content}</p>
          ${list[index].srcImg ? `<img src="${list[index].srcImg}" alt="Quà đã chọn" style="width: 100%; border-radius: 8px;" loading="lazy">` : ""}
          <div class="buttons">
            <button class="back-btn" onclick="back('6d',4)" aria-label="Quay lại">Quay lại</button>
          </div>`

          if(real===true){
          patchData(index + 1);}
       
        launchConfetti(); // bắn pháo hoa khi chọn quà
        
      });
    });
