var fso = new ActiveXObject("Scripting.FileSystemObject");
// 親フォルダ
var strScriptPath = String(WScript.ScriptFullName).replace(WScript.ScriptName,"");

var objFolder = fso.GetFolder(strScriptPath);
var objEmu = new Enumerator(objFolder.SubFolders);

var foldersName = [];

for(; !objEmu.atEnd(); objEmu.moveNext()) {
  foldersName.push(objEmu.item().Name);
}

var matched = [];
var matchedFolders = [];
for(var i = 0; i < foldersName.length; i++) {
  if(/.* - .*/.test(foldersName[i])) {
    matchedFolders.push(foldersName[i]);
    var found = foldersName[i].match(/(.*) - (.*)/);
    matched.push({mod: found[1], version: found[2]});
  }
}

for(var i = 0; i < matched.length; i++) {
  if(fso.FolderExists(fso.GetAbsolutePathName(".\\" + matched[i].mod))) {
    WScript.echo("FolderExists: " + matched[i].mod);
  } else {
    fso.CreateFolder(fso.GetAbsolutePathName(".\\" + matched[i].mod));
    WScript.echo("FolderCreated: " + matched[i].mod);
  }

  if(fso.FolderExists(fso.GetAbsolutePathName(".\\" + matched[i].mod + "\\" + matched[i].version))) {
    WScript.echo("FolderExists: " + matched[i].mod + "\\" + matched[i].version);
  } else {
    fso.CreateFolder(fso.GetAbsolutePathName(".\\" + matched[i].mod + "\\" + matched[i].version));
    WScript.echo("FolderCreated: " + matched[i].mod + "\\" + matched[i].version);
  }
  fso.CopyFolder(fso.GetAbsolutePathName(".\\" + matchedFolders[i]),
                                         fso.GetAbsolutePathName(".\\" + matched[i].mod + "\\" + matched[i].version));
  WScript.echo("CopyedFiles: " + matched[i].mod + "\\" + matched[i].version);
}
