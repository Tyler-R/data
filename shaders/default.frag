uniform vec4 color;
uniform float specular;
    
varying vec3 normal;
varying vec3 light;
varying vec3 eye;
    
void main()
{
    vec3 n = normalize(normal);
    vec3 l = normalize(light);
    
    float intensity = dot(n, l);

    vec3 e = normalize(eye);
    vec3 r = reflect(-l, n);
    intensity = intensity + pow(dot(e, r), specular); 
    
    gl_FragColor = color * intensity;
}
