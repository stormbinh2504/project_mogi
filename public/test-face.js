const input1 = document.getElementById('myImg1');
const input2 = document.getElementById('myImg2');
const detection1 = await faceapi.detectAllFaces(input1).withFaceLandmarks().withFaceDescriptors()
const detection2 = await faceapi.detectAllFaces(input2).withFaceLandmarks().withFaceDescriptors()
// const detection1 = await  faceapi.detectAllFaces(input1).withFaceLandmarks().withFaceDescriptors();
// const detection2 = await faceapi.detectAllFaces(input2).withFaceLandmarks().withFaceDescriptors();

// const detection1 = await  faceapi.detectAllFaces(input1, new faceapi.SsdMobilenetv1Options());
// const detection2 = await faceapi.detectAllFaces(input2, new faceapi.SsdMobilenetv1Options())
const distance = faceapi.euclideanDistance(detection1, detection2);
console.log("binh---", distance);

// var threshold = 0.6
// var descriptors = { desc1: null, desc2: null }

// function updateResult() {
//     const distance = faceapi.utils.round(
//         faceapi.euclideanDistance(descriptors.desc1, descriptors.desc2)
//     )
//     let text = distance
//     let bgColor = '#ffffff'
//     if (distance > threshold) {
//         text += ' (no match)'
//         bgColor = '#ce7575'
//     }
//     $('#distance').val(text)
//     $('#distance').css('background-color', bgColor)
// }

// async function onSelectionChanged(which, uri) {
//     const input = await faceapi.fetchImage(uri)
//     const imgEl = $(`#face${which}`).get(0)
//     imgEl.src = input.src
//     descriptors[`desc${which}`] = await faceapi.computeFaceDescriptor(input)
// }

// async function run() {
//     await faceapi.loadFaceRecognitionModel()
//     $('#loader').hide()
//     await onSelectionChanged(1, $('#selectList1 select').val())
//     await onSelectionChanged(2, $('#selectList2 select').val())
//     updateResult()
// }



// function renderNavBar(navbarId, exampleUri) {
//     const examples = [
//         {
//             uri: 'face_detection',
//             name: 'Face Detection'
//         },
//         {
//             uri: 'face_landmark_detection',
//             name: 'Face Landmark Detection'
//         },
//         {
//             uri: 'face_expression_recognition',
//             name: 'Face Expression Recognition'
//         },
//         {
//             uri: 'age_and_gender_recognition',
//             name: 'Age and Gender Recognition'
//         },
//         {
//             uri: 'face_recognition',
//             name: 'Face Recognition'
//         },
//         {
//             uri: 'face_extraction',
//             name: 'Face Extraction'
//         },
//         {
//             uri: 'video_face_tracking',
//             name: 'Video Face Tracking'
//         },
//         {
//             uri: 'webcam_face_detection',
//             name: 'Webcam Face Detection'
//         },
//         {
//             uri: 'webcam_face_landmark_detection',
//             name: 'Webcam Face Landmark Detection'
//         },
//         {
//             uri: 'webcam_face_expression_recognition',
//             name: 'Webcam Face Expression Recognition'
//         },
//         {
//             uri: 'webcam_age_and_gender_recognition',
//             name: 'Webcam Age and Gender Recognition'
//         },
//         {
//             uri: 'bbt_face_landmark_detection',
//             name: 'BBT Face Landmark Detection'
//         },
//         {
//             uri: 'bbt_face_similarity',
//             name: 'BBT Face Similarity'
//         },
//         {
//             uri: 'bbt_face_matching',
//             name: 'BBT Face Matching'
//         },
//         {
//             uri: 'bbt_face_recognition',
//             name: 'BBT Face Recognition'
//         },
//         {
//             uri: 'batch_face_landmarks',
//             name: 'Batch Face Landmark Detection'
//         },
//         {
//             uri: 'batch_face_recognition',
//             name: 'Batch Face Recognition'
//         }
//     ]

//     const navbar = $(navbarId).get(0)
//     const pageContainer = $('.page-container').get(0)

//     const header = document.createElement('h3')
//     header.innerHTML = examples.find(ex => ex.uri === exampleUri).name
//     pageContainer.insertBefore(header, pageContainer.children[0])

//     const menuContent = document.createElement('ul')
//     menuContent.id = 'slide-out'
//     menuContent.classList.add('side-nav', 'fixed')
//     navbar.appendChild(menuContent)

//     const menuButton = document.createElement('a')
//     menuButton.href = '#'
//     menuButton.classList.add('button-collapse', 'show-on-large')
//     menuButton.setAttribute('data-activates', 'slide-out')
//     const menuButtonIcon = document.createElement('img')
//     menuButtonIcon.src = 'menu_icon.png'
//     menuButton.appendChild(menuButtonIcon)
//     navbar.appendChild(menuButton)

//     const li = document.createElement('li')
//     const githubLink = document.createElement('a')
//     githubLink.classList.add('waves-effect', 'waves-light', 'side-by-side')
//     githubLink.id = 'github-link'
//     githubLink.href = 'https://github.com/justadudewhohacks/face-api.js'
//     const h5 = document.createElement('h5')
//     h5.innerHTML = 'face-api.js'
//     githubLink.appendChild(h5)
//     const githubLinkIcon = document.createElement('img')
//     githubLinkIcon.src = 'github_link_icon.png'
//     githubLink.appendChild(githubLinkIcon)
//     li.appendChild(githubLink)
//     menuContent.appendChild(li)

//     examples
//         .forEach(ex => {
//             const li = document.createElement('li')
//             if (ex.uri === exampleUri) {
//                 li.style.background = '#b0b0b0'
//             }
//             const a = document.createElement('a')
//             a.classList.add('waves-effect', 'waves-light', 'pad-sides-sm')
//             a.href = ex.uri
//             const span = document.createElement('span')
//             span.innerHTML = ex.name
//             span.style.whiteSpace = 'nowrap'
//             a.appendChild(span)
//             li.appendChild(a)
//             menuContent.appendChild(li)
//         })

//     $('.button-collapse').sideNav({
//         menuWidth: 260
//     })
// }

// function getFaceImageUri(className, idx) {
//     return `${className}/${className}${idx}.png`
// }


// function renderFaceImageSelectList(selectListId, onChange, initialValue) {
//     const indices = [1, 2, 3, 4, 5]
//     function renderChildren(select) {
//         classes.forEach(className => {
//             const optgroup = document.createElement('optgroup')
//             optgroup.label = className
//             select.appendChild(optgroup)
//             indices.forEach(imageIdx =>
//                 renderOption(
//                     optgroup,
//                     `${className} ${imageIdx}`,
//                     getFaceImageUri(className, imageIdx)
//                 )
//             )
//         })
//     }

//     renderSelectList(
//         selectListId,
//         onChange,
//         getFaceImageUri(initialValue.className, initialValue.imageIdx),
//         renderChildren
//     )
// }

// $(document).ready(function () {
//     renderNavBar('#navbar', 'bbt_face_similarity')
//     renderFaceImageSelectList(
//         '#selectList1',
//         async (uri) => {
//             await onSelectionChanged(1, uri)
//             updateResult()
//         },
//         { className: 'sheldon', imageIdx: 1 }
//     )

//     renderFaceImageSelectList(
//         '#selectList2',
//         async (uri) => {
//             await onSelectionChanged(2, uri)
//             updateResult()
//         },
//         { className: 'howard', imageIdx: 1 }
//     )
//     run()
// })