attribute vec3 Tangent;
uniform int numLights;

varying vec3 LightDir;
varying vec3 EyeDir;
varying vec2 TexCoord;

void main()
{	
        gl_Position = ftransform();

        TexCoord = gl_MultiTexCoord0.st;


        vec3 normal = normalize( gl_NormalMatrix * gl_Normal );
        vec3 tangent = normalize( gl_NormalMatrix * Tangent );
        vec3 binormal = cross(normal,tangent);

        vec3 tmp;

        // Transform the light source into the surface-local coordinate system
        for(int i=0;i < 1; ++i){
            tmp.x = dot(gl_LightSource[i].position.xyz, tangent);
            tmp.y = dot(gl_LightSource[i].position.xyz, binormal);
            tmp.z = dot(gl_LightSource[i].position.xyz, normal);
            LightDir = normalize ( tmp );
        }

        // Transform the camera into into the surface-local coordinate system
        vec3 vVertex = vec3(gl_ModelViewMatrix * gl_Vertex);

        tmp.x = dot( vVertex, tangent );
        tmp.y = dot( vVertex, binormal );
        tmp.z = dot( vVertex, normal );

        EyeDir = normalize( tmp );
}
