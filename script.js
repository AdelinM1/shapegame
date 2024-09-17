document.addEventListener('DOMContentLoaded', () => {
    const shapeContainer = document.getElementById('shape-container');
    const showShapeButton = document.getElementById('show-shape');
    const checkShapeButton = document.getElementById('check-shape');
    const numberInput = document.getElementById('number-input');
    const message = document.getElementById('message');
    const colorOptions = document.getElementById('color-options');
    const shapeOptions = document.getElementById('shape-options');

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C', '#1ABC9C', '#F39C12', '#9B59B6', '#2ECC71'];
    const shapes = ['circle', 'square', 'triangle', 'pentagon', 'hexagon'];

    let correctShape = {};
    let selectedColor = '';
    let selectedShape = '';

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
    const getRandomShape = () => shapes[Math.floor(Math.random() * shapes.length)];
    const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

    const getShapeSVG = (shape) => {
        switch (shape) {
            case 'circle':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="none" /></svg>';
            case 'square':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="80" height="80" x="10" y="10" stroke="black" stroke-width="2" fill="none" /></svg>';
            case 'triangle':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" stroke="black" stroke-width="2" fill="none" /></svg>';
            case 'pentagon':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 90,38 73,90 27,90 10,38" stroke="black" stroke-width="2" fill="none" /></svg>';
            case 'hexagon':
                return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 90,35 90,65 50,90 10,65 10,35" stroke="black" stroke-width="2" fill="none" /></svg>';
            default:
                return '';
        }
    };

    const drawShape = (container, shape, color, number) => {
        container.innerHTML = '';
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape');
        shapeElement.style.backgroundColor = color;

        let shapeStyle = {};

        switch (shape) {
            case 'circle':
                shapeStyle = { borderRadius: '50%' };
                break;
            case 'square':
                shapeStyle = {};
                break;
            case 'triangle':
                shapeStyle = { clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' };
                break;
            case 'pentagon':
                shapeStyle = { clipPath: 'polygon(50% 0%, 100% 38%, 73% 90%, 27% 90%, 0% 38%)' };
                break;
            case 'hexagon':
                shapeStyle = { clipPath: 'polygon(50% 0%, 90% 35%, 90% 65%, 50% 90%, 10% 65%, 10% 35%)' };
                break;
            default:
                break;
        }

        Object.assign(shapeElement.style, shapeStyle);

        const numberElement = document.createElement('span');
        numberElement.textContent = number;
        numberElement.style.position = 'absolute';
        numberElement.style.top = '50%';
        numberElement.style.left = '50%';
        numberElement.style.transform = 'translate(-50%, -50%)';
        numberElement.style.fontSize = '24px';
        numberElement.style.color = '#000';

        shapeElement.appendChild(numberElement);
        container.appendChild(shapeElement);
    };

    const updateShapeDisplay = () => {
        if (selectedShape && selectedColor) {
            drawShape(shapeContainer, selectedShape, selectedColor, '');
        }
    };

    colors.forEach(color => {
        const button = document.createElement('div');
        button.classList.add('color-button');
        button.style.backgroundColor = color;
        button.addEventListener('click', () => {
            document.querySelectorAll('.color-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedColor = color;
            updateShapeDisplay();
        });
        colorOptions.appendChild(button);
    });

    // Populate shape options
    shapes.forEach(shape => {
        const button = document.createElement('div');
        button.classList.add('shape-button');
        button.innerHTML = getShapeSVG(shape);
        button.addEventListener('click', () => {
            document.querySelectorAll('.shape-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedShape = shape;
            updateShapeDisplay();
        });
        shapeOptions.appendChild(button);
    });

    showShapeButton.addEventListener('click', () => {
        correctShape.shape = getRandomShape();
        correctShape.color = getRandomColor();
        const shapeNumber = getRandomNumber();
        correctShape.number = shapeNumber;

        drawShape(shapeContainer, correctShape.shape, correctShape.color, shapeNumber);

        setTimeout(() => {
            shapeContainer.innerHTML = '';
        }, 1000);
    });

    checkShapeButton.addEventListener('click', () => {
        const userShapeNumber = parseInt(numberInput.value, 10);

        const isCorrect = selectedColor === correctShape.color &&
                          selectedShape === correctShape.shape &&
                          userShapeNumber === correctShape.number;

        message.textContent = isCorrect ? 'Correct!' : 'Try Again!';
    });
});
