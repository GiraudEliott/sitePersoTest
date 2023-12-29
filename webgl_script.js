// webgl_script.js
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;
    document.body.appendChild(canvas);

    var gl = canvas.getContext("webgl");

    if (!gl) {
        console.error("Impossible d'initialiser WebGL. Votre navigateur peut ne pas le supporter.");
        return;
    }

    // Chargez l'image
    var image = new Image();
    image.src = "./"; // Remplacez par le chemin de votre image

    image.onload = function() {
        // Initialise le contexte WebGL
        gl.clearColor(200, 0.4, 0.6, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Créez une texture WebGL
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Créez des shaders pour afficher la texture
        var vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0, 1);
                v_texCoord = a_texCoord;
            }
        `;

        var fragmentShaderSource = `
            precision mediump float;
            uniform sampler2D u_texture;
            varying vec2 v_texCoord;
            void main() {
                gl_FragColor = texture2D(u_texture, v_texCoord);
            }
        `;

        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        // Créez un programme WebGL et attachez les shaders
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        // Définissez les attributs des shaders
        var positionAttribute = gl.getAttribLocation(program, "a_position");
        var texCoordAttribute = gl.getAttribLocation(program, "a_texCoord");

        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        var positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionAttribute);

        var texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        var texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
        gl.vertexAttribPointer(texCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texCoordAttribute);

        // Passez la texture au shader
        var textureLocation = gl.getUniformLocation(program, "u_texture");
        gl.uniform1i(textureLocation, 0);

        // Activez la texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        // Dessinez le triangle avec la texture
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
});

function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Erreur de compilation du shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}
