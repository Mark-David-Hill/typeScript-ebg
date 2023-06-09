// Display 
const display = (target: HTMLElement, ...contents: [string | number]): void => {
    let content = "";
    contents.forEach(el => {
        content += el;
    });
    target.innerHTML = content;
}

export default display;