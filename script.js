// <-- Logic for browsing -->
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

// <-- Logic for drag and drop upload -->
function handleJSONDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    let files = evt.dataTransfer.files;
    // Loop through the FileList and read
    for (let i = 0, f; f = files[i]; i++) {

        // Only process json files.
        if (!f.type.match('application/json')) {
            continue;
        }

        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function() {
            return function(e) {
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
        })(f);

        reader.readAsText(f);
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
const dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleJSONDrop, false);

// <-- Logic for copy to clipboard -->
document.getElementById('copy-to-clipboard').onclick = function() {
    let content = document.getElementById('result');
    content.select();
    document.execCommand('copy');
};