# create-from-template

Simple script for creating new files from a template.

## Usage

Option 1: Run the script with name and path arguments.

```javascript
node create-from-template.js --name=<Name> --path=<Path>
```

Option 2: Run the script without arguments. In this case you will be asked to enter name and path.

## How it works

1. A new directory will be created at the provided path. `src` directory is defined as root directory. For example if the provided path is `components/some-component`, the new directory will be created at `src/components/some-component`.
2. The script will read all files located in the `template` directory and modify them based on the arguments provided to the script. `COMPONENT_NAME` will be replaced with the `name` argument. `COMPONENT_PATH` will be replaced with the `path` argument.
3. The modified files will be copied to the target directory.

## License

Released under MIT license.
