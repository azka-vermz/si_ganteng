let pertanyaan = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let result_box = document.querySelector('.result')

class Question {
    constructor(question, answer_1, answer_2, correct, answer_4, answer_5) {  // kalo mau jawaban yang benar di pilihan 1 
    // maka correct ditaruh di answer_1
        this.question = question
        this.correct = correct
        this.answers = [
            answer_1,
            answer_2,
            correct,
            answer_4,
            answer_5
        ]
    }

    display() {
        pertanyaan.innerHTML = this.question
        let shuffled = this.shuffle([...this.answers])
        for (let i = 0; i < answer_buttons.length; i++) {
            answer_buttons[i].innerHTML = shuffled[i]
            answer_buttons[i].classList.remove("correct", "wrong")
            answer_buttons[i].style.pointerEvents = "auto"
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }
}

let current_questions = [
    new Question(
        "Siapa presiden pertama Indonesia?",
        "Jokowi",
        "Soeharto",
        "Soekarno",
        "Habibie",
        "Megawati"
    ),
    new Question(
        "Mamalia terbesar di dunia adalah?",
        "Gajah Afrika",
        "Paus Pembunuh",
        "Paus Biru",
        "Ikan Pari",
        "Hiu Putih"
    ),
    new Question(
        "Siapa penemu lampu pijar?",
        "Nikola Tesla",
        "Alexander Bell",
        "Thomas Edison",
        "Benjamin Franklin",
        "Albert Einstein"
    ),
    new Question(
        "Apa logika berikutnya? 2, 4, 8, 16, ...",
        "18",
        "20",
        "32",
        "24",
        "30"
    ),
    new Question(
        "Siapakah nama tutor Anda yang sangat keren ini?",
        "POKOKNYA BUKAN FATHIN",
        "Farabi",
        "BUKAN FATHIN",
        "Bapak",
        "Budi"
        
    )
]

let total_jawaban = 0
let correct_count = 0
let current_question = current_questions[total_jawaban]
current_question.display()

function handleAnswerClick(button) {
    const selected = button.innerHTML // const artinya adalah sesuatu yang konstan dalam hal ini adalah jawaban yang dipilih
    const isCorrect = selected === current_question.correct // ini artinya adalah jawaban yang benar

    if (isCorrect) {
        button.classList.add("correct")  // button.classList.add("correct") artinya adalah jika jawaban yang dipilih benar 
        // maka akan menambahkan class "correct" pada button dan ini berasal dari kelas CSS
        correct_count += 1
    } else {
        button.classList.add("wrong")
        correct_count -= 1 // jika ingin menambhakan sistem minus
        answer_buttons.forEach(btn => {  // artinya adalah jika jawaban yang dipilih salah maka akan menambahkan class "wrong" pada button
            // dan kelas wrong itu berasal dari kelas CSS
            if (btn.innerHTML === current_question.correct) {
                btn.classList.add("correct")
            }
        })
    }

    answer_buttons.forEach(btn => btn.style.pointerEvents = "none") // artinya adalah jika jawaban yang dipilih benar atau salah 
    // maka tidak bisa mengklik jawaban lain ATAU ANDA HANYA BISA KLIK SEKALI OY


    // setTimeout digunakan untuk memberikan jeda sebelum pertanyaan berikutnya muncul
    setTimeout(() => {
        total_jawaban += 1
        if (total_jawaban < current_questions.length) {
            current_question = current_questions[total_jawaban]
            current_question.display()
        } else {
            showResult()
        }
    }, 1000)  // 1000 adalah dalam milisekon
}

function showResult() {
    const total_questions = current_questions.length
    const wrong_count = total_questions - correct_count

    pertanyaan.innerHTML = "Quiz Selesai!" // innerHTML digunakan untuk mengubah isi dari elemen HTML
    document.querySelector('.ans-row').style.display = 'none' // querySelector digunakan untuk memilih elemen HTML
    // style.display = 'none' artinya adalah menyembunyikan elemen HTML
    result_box.style.display = 'block'

    result_box.innerHTML = `
        <p><strong>Hasil Akhir:</strong></p>
        <p>Jawaban Benar: <span style="color: green">${correct_count/total_questions * 100}</span></p>
        <p>Jawaban Salah: <span style="color: red">${wrong_count/total_questions * 100}</span></p>
        <p>Total Soal: ${total_questions}</p>
    `
}

// kode terakhir ini adalah unutk menambahkan event listener(suatu fungsi yang mengecek susatu telah terjadi) pada setiap tombol jawaban
answer_buttons.forEach(button => {
    button.addEventListener('click', () => handleAnswerClick(button))
})
