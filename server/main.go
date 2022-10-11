package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
)

// Version Inject from build via linker argument
var Version string
var GitHeadSha string

var rootDir = getRootDirAbsolutePath()
var publicDir = path.Join(rootDir, "public")

func main() {
	showVersionFlag := flag.Bool("v", false, "Show version")
	port := flag.String("port", "8080", "Port to run web server on. Defaults to 8080")
	address := flag.String("address", "127.0.0.1", "Port to run web server on. Defaults to 127.0.0.1")
	flag.Parse()

	if *showVersionFlag {
		fmt.Println(fmt.Sprintf("%s (%s)", Version, GitHeadSha))
		os.Exit(0)
	}

	addressAndPort := fmt.Sprintf("%s:%s", *address, *port)
	log.Printf("Starting server: address=`%s` publicPath=`%s`\n", addressAndPort, publicDir)
	log.Fatal(
		http.ListenAndServe(
			addressAndPort,
			http.FileServer(http.Dir(publicDir)),
		),
	)
}

func getRootDirAbsolutePath() string {
	pathExecutable, err := os.Executable()
	if err != nil {
		panic(err)
	}
	return filepath.Join(pathExecutable, "../..")
}
