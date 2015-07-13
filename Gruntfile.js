var path = require("path");

module.exports = function (grunt) {
    var src = "src";
    var dest = "dest";
    grunt.initConfig({
        watch: {
            files: [
                path.join(src, "**/*"),
                "Gruntfile.js"
            ],
            tasks: [
                "browserify",
                //"uglify",
                "jade",
                "less"
            ]
        },
        browserify: {
            dist: {
                files: {
                    "dest/bundle.js": [
                        path.join(src, "js/*.js")
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    "dest/bundle.min.js": [
                        "dest/bundle.js"
                    ]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: [
                        "assets/css"
                    ],
                    strictImports: true,
                    compress: true
                },
                files: {
                    "dest/style.css": "src/less/style.less"
                }
            }
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "dest/index.html": [
                        "src/jade/*.jade"
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-jade");

    grunt.registerTask("default", [
        "watch"
    ]);
};
