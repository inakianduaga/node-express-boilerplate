// Type definitions for dotenv
// Project: https://github.com/visionmedia/debug


declare module "dotenv" {

  function load(options?: {
    path: string,
    encoding: string
  }) : Boolean;

  function config(options?: {
    path: string,
    encoding: string
  }) : Boolean;
  
  function parse(src: any): Object;
  
  export = {
    load,
    config,
    parse
  };

}

