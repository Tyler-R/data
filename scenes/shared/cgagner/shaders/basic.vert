varying vec3 Normal;
varying vec3 Vertex;
void main(void)
{
   Vertex = vec3(gl_ModelViewMatrix * gl_Vertex);
   Normal = normalize(gl_NormalMatrix * gl_Normal);
   gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
