


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

    // Fireworks Effect
    // function launchFireworks() {
    //   confetti({
    //     particleCount: 200,
    //     spread: 90,
    //     startVelocity: 45,
    //     decay: 0.9,
    //     gravity: 0.5,
    //     ticks: 200,
    //     origin: { y: 0 }
    //   });
   // }
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
    const BIN_ID = "68711c223497bd4cad9af280";
    const list = [
      { content: "Bạn đã chọn móc khóa", srcImg: "" },
      { content: "Bạn đã chọn gấu bông", srcImg: "" },
      { content: "Bạn đã không chọn gì", srcImg: "" },
      { content: "Bạn đã chọn tất", srcImg: "ảnh chiếc.jpg" }
    ];

    function getData() {
        console.log("đang getdata")
      fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        method: "GET",
        headers: { "X-Access-Key": "$2a$10$jcTFWdrVTyEvPPqaOa/j9OURzv/IbGEHkQ/RWrfqvPah7kTjEWyX." }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.record.quadachon || data.record.quadachon === "") {
          console.log("Chưa chọn quà");
          return;
        }
        console.log("Đã có quà được chọn trước đó");
        document.querySelector(".page6d").innerHTML = `
          <h1>Món quà cho người đặc biệt!</h1>
          <p class="content">${list[data.record.quadachon - 1].content}</p>
          <div class="buttons">
            <button class="back-btn" onclick="back('6d',4)" aria-label="Quay lại">Quay lại</button>
          </div>`;
      })
      .catch(err => console.error("Có lỗi:", err));
    }
   // getData();

    function postData(num) {
      const newData = { quadachon: num };
      fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key": "$2a$10$jcTFWdrVTyEvPPqaOa/j9OURzv/IbGEHkQ/RWrfqvPah7kTjEWyX."
        },
        body: JSON.stringify(newData)
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error("Có lỗi:", err));
    }

    // Surprise Image Effect
    function doaMa() {
      document.getElementById("anh-ma").src = "gif dọa ma.gif";
    }

    // Navigation
    function next(thisNum,nextNum) {

        const currentPage = document.querySelector(`.page${thisNum}`);
        const nextPage = document.querySelector(`.page${nextNum}`);
        if( thisNum === 2 && document.getElementById("page2-qes").value != 16) {
          document.getElementById("page2-error").style.display = "block";
          return;
        } 
        else {
          document.getElementById("page2-error").style.display = "none";
          
        }
         if( thisNum === 5 && document.getElementById("page5-qes").value != "2009-07-12") {
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
        if( thisNum == 7 ){
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
        postData(index + 1);
       // getData();
        launchConfetti(); // Confetti khi chọn quà
        launchFireworks(); // Pháo hoa khi chọn quà
      });
    });
