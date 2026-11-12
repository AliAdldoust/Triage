
// Comprehensive categorized symptom library
const SYMPTOM_CATEGORIES = [
  {
    id: 'anxiety',
    name: 'اضطراب، استرس، پانیک',
    icon: '⚡',
    items: [
      'احساس دلشوره مزمن، اضطراب شدید و تپش قلب مداوم',
      'حملات ترس ناگهانی، تنگی نفس و پانیک (Panic Attack)',
      'نگرانی شدید، پیشگویی منفی و فاجعه‌سازی آینده',
      'اضطراب اجتماعی شدید در جمع، مهمانی و سخنرانی کاری',
      'انقباض عضلانی، سردردهای تنشی و بی‌قراری بدنی',
    ],
  },
  {
    id: 'depression',
    name: 'افسردگی، افت خلق',
    icon: '🌧️',
    items: [
      'احساس غم عمیق، پوچی و گریه‌های مکرر بی‌دلیل',
      'بی‌انگیزگی شدید و لذت نبردن از هیچ کاری (آنهدونیا)',
      'خستگی مفرط، سنگینی بدن و افت شدید انرژی روزانه',
      'احساس بی‌ارزشی، عذاب وجدان و سرزنش مداوم خود',
      'انزوای اجتماعی، گوشه‌گیری و دوری از دیگران',
    ],
  },
  {
    id: 'relationship',
    name: 'روابط عاطفی و خانواده',
    icon: '💑',
    items: [
      'تعارضات شدید و مشاجره مکرر و عدم تفاهم با همسر',
      'سردی عاطفی، دلسردی و فاصله در رابطه زناشویی',
      'بحران بی‌وفایی، خیانت و آسیب به اعتماد متقابل',
      'مشاوره پیش از ازدواج و ارزیابی تناسب شخصیتی',
      'تصمیم‌گیری پیرامون طلاق، جدایی یا بازسازی رابطه',
    ],
  },
  {
    id: 'ocd',
    name: 'وسواس فکری و عملی (OCD)',
    icon: '🔄',
    items: [
      'افکار ناخواسته، آزاردهنده و نشخوار فکری تکراری',
      'چک کردن مکرر قفل درها، شیر گاز، برق و پیام‌ها',
      'وسواس شدید شستشو، نجاست، میکروب و آلودگی',
      'نیاز افراطی به تقارن، شمارش و نظم وسواسی',
      'ترس از آسیب ناخواسته به دیگران یا افکار ناخوشایند',
    ],
  },
  {
    id: 'child_adolescent',
    name: 'کودک، نوجوان و فرزندپروری',
    icon: '👶',
    items: [
      'لجبازی، پرخاشگری، کج‌خلقی و قشقرق کودک',
      'اضطراب جدایی از والدین و ترس‌های شدید شبانه کودک',
      'افت شدید تحصیلی، بی‌علاقگی به درس و مدرسه',
      'چالش‌های رفتاری دوران بلوغ و تعارضات شدید با نوجوان',
      'اختلالات رفتاری و مهارت‌های فرزندپروری موثر',
    ],
  },
  {
    id: 'adhd_learning',
    name: 'بیش‌فعالی (ADHD)',
    icon: '🎯',
    items: [
      'کم‌توجهی، حواس‌پرتی و عدم تمرکز در کار یا تحصیل',
      'تحرک بدنی بیش از حد، تکانشگری و بی‌قراری مداوم',
      'مشکلات یادگیری، ضعف حافظه کاری و سازماندهی کارها',
    ],
  },
  {
    id: 'sleep_somatic',
    name: 'خواب و اختلالات روان‌تنی',
    icon: '🌙',
    items: [
      'بی‌خوابی مزمن، دیر به خواب رفتن و بیداری مکرر شبانه',
      'پرخوری عصبی یا بی‌اشتهایی شدید ناشی از اضطراب',
      'دردهای جسمی مزمن با منشأ عصبی و استرس',
    ],
  },
  {
    id: 'trauma_grief',
    name: 'تروما و سوگ',
    icon: '💔',
    items: [
      'تجربه سوگ عمیق و از دست دادن یکی از عزیزان',
      'خاطرات تلخ و شوک روانی ناشی از حادثه یا تروما (PTSD)',
      'شکست عاطفی و ناتوانی در فراموشی رابطه گذشته',
    ],
  },
  {
    id: 'burnout_work',
    name: 'فرسودگی شغلی',
    icon: '💼',
    items: [
      'کمال‌گرایی افراطی و ترس شدید از اشتباه و شکست',
      'فرسودگی شغلی (Burnout) و فشار کاری فرساینده',
      'اهمال‌کاری مزمن و عقب انداختن کارهای مهم زندگی',
    ],
  },
  {
    id: 'self_growth',
    name: 'رشد فردی و عزت‌نفس',
    icon: '🌱',
    items: [
      'کمبود اعتمادبه‌نفس، احساس بی‌کفایتی و خودسرزنش‌گری',
      'مشکلات در قاطعیت، نه گفتن و تعیین مرزهای شخصی',
      'سردرگمی در هدف‌گذاری فردی و مسیر زندگی',
    ],
  },
];











const categoriesContainer = document.getElementById('categories-container');
const itemsContainer = document.getElementById('items-container');
const resultContainer = document.getElementById('analysis-result');
let conversationHistory = [];
let selectedItems = [];



const submitButton = document.createElement('button');



submitButton.textContent = 'Send';
submitButton.classList.add('submit-button');






// Create category buttons
SYMPTOM_CATEGORIES.forEach(category => {



    const button = document.createElement('button');

    button.textContent = `${category.icon} ${category.name}`;



    button.addEventListener('click', () => {



        selectedItems = [];
        
        // Remove selected class from all category buttons
        document.querySelectorAll('#categories-container button')
                .forEach(btn => btn.classList.remove('selected'));

        // Highlight clicked category
        button.classList.add('selected');



        // Clear previous items
        itemsContainer.innerHTML = '';

        // Create selected category items
        category.items.forEach(item => {

            const itemButton = document.createElement('button');

            itemButton.textContent = item;

            itemButton.addEventListener('click', () => {

                  itemButton.classList.toggle('selected');

                  if (itemButton.classList.contains('selected')){

                      selectedItems.push(itemButton.textContent)
                          
                  } else {
                      selectedItems = selectedItems.filter(
                      item => item !== itemButton.textContent
                  );

            }
            
            
          });
          
          
          itemsContainer.appendChild(itemButton);
          
        });
        
          itemsContainer.appendChild(submitButton);
        
      });
      
      categoriesContainer.appendChild(button);
      
    });

  
    


     
submitButton.addEventListener('click', async () => {


      if (selectedItems.length === 0) {
        alert('Please select at least one symptom.');
        return;
    }

      submitButton.remove();

          try {


          const result = await processItems(selectedItems);


          displayFollowUp(result);


      } catch (error) {
          console.error('Error:', error);
      }

  });








async function processItems(newItems){

    conversationHistory.push({
        role: 'user',
        content: JSON.stringify(newItems)
  });





    const response = await fetch('http://localhost:3000/api/selected-items', {

        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            conversation: conversationHistory
        }), 

    })

    const result = await response.json();

    result.analysis = JSON.parse(result.analysis);

    conversationHistory.push({
          role: 'assistant',
          content: JSON.stringify(result.analysis)
    });

    console.log(result);
    return result;

}








function displayFollowUp(result) {

  
      const followUp = result.analysis;

      const conversationTurn = document.createElement('div'); 
          conversationTurn.classList.add('conversation-turn');

      if (followUp.question){

        const question = document.createElement('h3');
        question.textContent = followUp.question;
        
        conversationTurn.appendChild(question);
        
        // Create an answer button for each possible answer
        followUp.answers.forEach(answer => {
        
                const answerButton = document.createElement('button');
            
                answerButton.textContent = answer;
                answerButton.classList.add('answer-button');
            
                answerButton.addEventListener('click', () => {
              
                      // Remove selection from other answer buttons
                      conversationTurn.querySelectorAll('.answer-button')
                          .forEach(btn => btn.classList.remove('selected'));
              
                      // Highlight selected answer
                      answerButton.classList.add('selected');
              
                      // Save the user's answer
                      selectedAnswer = answer;
              
                });
        
            conversationTurn.appendChild(answerButton);
        });



      }

      if (followUp.response){

        const response = document.createElement('h3');
        response.textContent = followUp.response;
        
        conversationTurn.appendChild(response);

        // creating a text place for here 

      }

      resultContainer.appendChild(conversationTurn)



      const newSubmitButton = document.createElement('button');

      newSubmitButton.textContent = 'Send';
      newSubmitButton.classList.add('submit-button');


      resultContainer.appendChild(newSubmitButton);


      newSubmitButton.addEventListener('click', async () => {

      
      const selectedAnswer = conversationTurn.querySelector(
      '.answer-button.selected'
        );

        if (!selectedAnswer) {
            alert('Please select an answer.');
            return;
        }

        const answer = [selectedAnswer.textContent];


        newSubmitButton.remove();


        try {
          
          const result = await processItems(answer);
          displayFollowUp(result)
          console.log('conversation:', conversationHistory)
          console.log("Question:", result.analysis.question);



        } catch (error) {
          console.error(error);
        }


      })


}  
