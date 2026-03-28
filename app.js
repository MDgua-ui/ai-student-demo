// ===================== 可调参数（优化点！） =====================
const CONFIDENCE_THRESHOLD = 0.5; // 识别置信度阈值（0~1，改数字即可调参）
const MAX_RESULTS = 3; // 最多显示3个识别结果
// ==============================================================

let model;

// 加载AI模型
async function loadModel() {
    console.log("AI模型加载中...");
    model = await mobilenet.load();
    console.log("AI模型加载完成！");
}

// 图片上传预览 + AI识别
document.getElementById('imageUpload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file || !model) return;

    // 图片预览
    const img = document.getElementById('previewImage');
    img.src = URL.createObjectURL(file);
    img.style.display = 'block';

    // 等待图片加载完成
    await new Promise(resolve => img.onload = resolve);

    // AI识别
    const predictions = await model.classify(img, MAX_RESULTS);
    
    // 渲染结果
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<h3>AI识别结果：</h3>";
    predictions.forEach(pred => {
        // 过滤低置信度结果
        if (pred.probability >= CONFIDENCE_THRESHOLD) {
            resultDiv.innerHTML += `<p>${pred.className}：${(pred.probability * 100).toFixed(2)}%</p>`;
        }
    });
});

// 初始化加载模型
loadModel();