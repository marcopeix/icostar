document.getElementById('import').onclick = function() {
    let files = document.getElementById('selectFiles').files;

    if (files.length <= 0) {
        return false;
    }

    const fr = new FileReader();

    fr.onload = function(e) {
        const icons = JSON.parse(e.target.result).icons;
        let template = document.getElementById('template').value;
        let customTemplate = '';

        for(let icon of icons){
            let iconName = icon.properties.name;
            let iconClass = `icon-${iconName}`;
            customTemplate += template.replace(/%icon/g, `${iconClass}`) + '\n';
        }

        document.getElementById('result').value = customTemplate;
    };

    fr.readAsText(files.item(0));
};

document.getElementById('copy-to-clipboard').onclick = function() {
    let content = document.getElementById('result');
    content.select();
    document.execCommand('copy');
};