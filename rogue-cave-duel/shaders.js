// This file was generated by running command
//     scripts/build-shaders.sh shaders/blur.frag shaders/constant.frag shaders/constant.vert shaders/dither.frag shaders/effect.vert shaders/grayscale.frag shaders/particle.frag shaders/particle.vert shaders/texture.frag shaders/texture.vert
shaders = {
  'blur.frag':
  "#version 100 \n"+
  "precision mediump float; \n"+
  " \n"+
  "const int MAX_KERNEL_SIZE = 20; \n"+
  "uniform sampler2D sampler; \n"+
  "uniform float kernel[MAX_KERNEL_SIZE]; \n"+
  "uniform int kernel_size; \n"+
  "uniform vec2 delta; \n"+
  "varying vec2 texCoord; \n"+
  " \n"+
  "void main() { \n"+
  "    vec3 p = texture2D(sampler, texCoord).xyz * kernel[0]; \n"+
  "    float weight_sum = kernel[0]; \n"+
  "    int j = 1; \n"+
  "    for (int i=1; i<MAX_KERNEL_SIZE; i++) { \n"+
  "        if (j++ >= kernel_size) \n"+
  "            break; \n"+
  "        weight_sum += kernel[i] * 2.0; \n"+
  "        p += texture2D(sampler, texCoord + delta*float(i)).xyz * kernel[i]; \n"+
  "        p += texture2D(sampler, texCoord - delta*float(i)).xyz * kernel[i]; \n"+
  "    } \n"+
  "    gl_FragColor = vec4(p / weight_sum, 1.0); \n"+
  "} \n"+
  "",
  'constant.frag':
  "#version 100 \n"+
  "precision mediump float; \n"+
  " \n"+
  "uniform vec4 color; \n"+
  " \n"+
  "void main() { \n"+
  "    gl_FragColor = color; \n"+
  "} \n"+
  "",
  'constant.vert':
  "#version 100 \n"+
  " \n"+
  "uniform mat3 matrix; \n"+
  "attribute vec2 pos; \n"+
  " \n"+
  "void main() { \n"+
  "    gl_Position = vec4(matrix * vec3(pos, 1), 1); \n"+
  "} \n"+
  "",
  'dither.frag':
  "#version 100 \n"+
  "precision mediump float; \n"+
  " \n"+
  "uniform sampler2D sampler; \n"+
  "varying vec2 texCoord; \n"+
  " \n"+
  "void main() { \n"+
  "    if (mod(gl_FragCoord.y, 2.0) < 1.0) \n"+
  "        gl_FragColor = vec4(texture2D(sampler, texCoord).xyz, 1); \n"+
  "    else \n"+
  "        gl_FragColor = vec4(.1, .1, .1, 1); \n"+
  "} \n"+
  "",
  'effect.vert':
  "#version 100 \n"+
  " \n"+
  "attribute vec4 vertex; \n"+
  "varying vec2 texCoord; \n"+
  " \n"+
  "void main() { \n"+
  "    gl_Position = vec4(vertex.xy, 0, 1); \n"+
  "    texCoord = vertex.zw; \n"+
  "} \n"+
  "",
  'grayscale.frag':
  "#version 100 \n"+
  "precision mediump float; \n"+
  " \n"+
  "uniform sampler2D sampler; \n"+
  "varying vec2 texCoord; \n"+
  " \n"+
  "void main() { \n"+
  "    vec3 p = texture2D(sampler, texCoord).xyz; \n"+
  "    float x = (p.x + p.y + p.z) / 3.0; \n"+
  "    gl_FragColor = vec4(x, x, x, 1); \n"+
  "} \n"+
  "",
  'particle.frag':
  "#version 100 \n"+
  "precision mediump float; \n"+
  " \n"+
  "uniform vec4 color; \n"+
  " \n"+
  "void main() { \n"+
  "    if (distance(vec2(0.5, 0.5), gl_PointCoord) < 0.5) \n"+
  "        gl_FragColor = color; \n"+
  "    else \n"+
  "        discard; \n"+
  "} \n"+
  "",
  'particle.vert':
  "#version 100 \n"+
  " \n"+
  "uniform mat3 matrix; \n"+
  "attribute vec3 data; \n"+
  " \n"+
  "void main() { \n"+
  "    gl_Position = vec4(matrix * vec3(data.xy, 1), 1); \n"+
  "    gl_PointSize = data[2]; \n"+
  "} \n"+
  "",
  'texture.frag':
  "#version 100 \n"+
  "precision mediump float; \n"+
  " \n"+
  "uniform sampler2D sampler; \n"+
  "varying vec2 texCoord; \n"+
  " \n"+
  "void main() { \n"+
  "    gl_FragColor = texture2D(sampler, texCoord); \n"+
  "} \n"+
  "",
  'texture.vert':
  "#version 100 \n"+
  " \n"+
  "uniform mat3 matrix; \n"+
  "attribute vec4 vertex; \n"+
  "varying vec2 texCoord; \n"+
  " \n"+
  " \n"+
  "void main() { \n"+
  "    gl_Position = vec4(matrix * vec3(vertex.xy, 1), 1); \n"+
  "    texCoord = vertex.zw; \n"+
  "} \n"+
  ""
}
