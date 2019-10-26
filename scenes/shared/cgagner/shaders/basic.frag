varying vec3 Normal;
varying vec3 Vertex;
void main (void)
{
   vec3 L = normalize(gl_LightSource[0].position.xyz - Vertex);
   vec3 E = normalize(-Vertex);
   vec3 R = normalize(-reflect(L,Normal));

   //calculate Ambient Term:
   vec4 Iamb = gl_FrontMaterial.ambient;

   //calculate Diffuse Term:
   vec4 Idiff = gl_FrontMaterial.diffuse * max(dot(Normal,L), 0.0);

   Idiff = clamp(Idiff, 0.0, 1.0);

   // calculate Specular Term:
   vec4 Ispec = gl_FrontMaterial.specular
                * pow(max(dot(R,E),0.0),0.3*gl_FrontMaterial.shininess);
   Ispec = clamp(Ispec, 0.0, 1.0);
   // write Total Color:
   //gl_FragColor = gl_FrontLightModelProduct.sceneColor + Iamb + Idiff + Ispec;
   gl_FragColor = Idiff + Ispec;
   //gl_FragColor = vec4 (gl_FrontMaterial.diffuse.xyz * max(dot(N,L), 0.0), 1);

}
