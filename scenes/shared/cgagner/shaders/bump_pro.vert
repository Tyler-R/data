const int MAX_LIGHTS = 8;
attribute vec3 Tangent;
uniform int numLights;

varying vec3 LightDir[MAX_LIGHTS];
varying vec3 EyeDir;
varying vec2 TexCoord;

void main(){

    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
    TexCoord = gl_MultiTexCoord0.st;

    vec3 Normal = normalize( gl_NormalMatrix * gl_Normal );

    vec3 tangent = normalize( gl_NormalMatrix * Tangent );
    vec3 binormal = cross(Normal,tangent);

    vec3 Vertex = vec3(gl_ModelViewMatrix * gl_Vertex);

    vec3 tmp;
    for(int i=0;i < numLights; ++i){
        LightDir[i] = normalize( gl_LightSource[i].position.xyz - Vertex );
        tmp.x = dot(LightDir[i], tangent);
        tmp.y = dot(LightDir[i], binormal);
        tmp.z = dot(LightDir[i], Normal);
        LightDir[i] = normalize( tmp );
    }

    tmp.x = dot( Vertex, tangent );
    tmp.y = dot( Vertex, binormal );
    tmp.z = dot( Vertex, Normal );
    EyeDir = normalize( tmp );
}
