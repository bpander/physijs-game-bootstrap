var require = {

    paths: {
        'three': 'lib-thirdparty/three.min-physijs',
        'physijs': 'lib-thirdparty/physi'
    },

    shim: {
        'physijs': ['three']
    }

};