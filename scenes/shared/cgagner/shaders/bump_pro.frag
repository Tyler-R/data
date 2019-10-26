const int MAX_LIGHTS = 8;
uniform sampler2D texture1;
uniform vec4 baseColor;
uniform int numLights;
varying vec2 TexCoord;


varying vec3 LightDir[MAX_LIGHTS];
varying vec3 EyeDir;
varying vec3 Normal;
varying vec3 Vertex;

vec3 getIntensity( int light ){


    float density = 15.0;
    float size = 0.15;
    float k_spec = 0.9;

    vec2 c = density * TexCoord.st;
    vec2 p = fract(c) - vec2(0.5);

    float d = dot(p,p);
    float f = inversesqrt( d + 1.0);

    if(d >= size){
        p = vec2(0.0);
        f = 1.0;
    }

    vec3 normalDelta = vec3(p.x, p.y, 1.0) * f;
    vec3 color = baseColor.xyz * max( dot(normalDelta, LightDir[light]), 0.0 );

    vec3 ref = normalize( reflect(LightDir[light], normalDelta).xyz );
    float spec = max( dot(EyeDir, ref), 0.0);
    spec = pow(spec, 6.0);
    spec *= k_spec;

    return min( color + color * spec, vec3(1.0) );
} // END getIntensity(int light)

void main (void){
    vec3 color;
    // Loop over all of the lights and get the intensity from each
    for(int i =0; i < numLights; ++i){
        color += getIntensity(i);
    } // END for-loop over intensity

    gl_FragColor = vec4( color, baseColor.a );

} // END of main
