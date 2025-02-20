import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class EditorAutofocus extends Plugin {
	async onload() {

	 	this.registerEvent(
	      this.app.workspace.on('file-open', async (file) => {
	      	let editor = this.getEditor();
	      	if (editor) {

	      		// if we have more than two lines, it's probably not a new file. just bail.
	      		if (editor.lineCount() > 2) {
	      			return
	      		}

	      		// focus on the editor, skip the tab title bar
	        	editor.focus();

	        	// wait a while, so obsidian filename heading sync can do its thing
	      		await sleep(100);

	      		// see if the first character of the first line is a #
	      		let firstLine = editor.getLine(0);
	      		let firstCharacter = firstLine.substr(0, 1);

	      		if (firstCharacter != '#') {
	      			return;
	      		}

	      		// otherwise, select the heading
	        	let lineLength = firstLine.length;

	        	if (lineLength > 1) {
		        	editor.setSelection(
						{ line: 0, ch: 2 },
						{ line: 0, ch: lineLength }
					);
	        	}

	        }
    	  })
	    );
	}

	onunload() {

	}

	private getEditor(): Editor | undefined {
		return this.app.workspace.getActiveViewOfType(MarkdownView)?.editor;
	}

}
