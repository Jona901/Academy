window.addEventListener('DOMContentLoaded', async function() {
    async function get(url) {
      const resp = await fetch(url);
      return resp.json();
    }
  
    const emojis = await get('https://api.github.com/emojis');
    const colors = await get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');
  
   document.querySelectorAll('.repo-card').forEach(async function(el) {
      const name = el.getAttribute('data-repo');
      const dis_er = el.getAttribute('data-dis');
  
      const data = await get(`https://api.github.com/`);
  
      data.description = (data.description || '').replace(/:\w+:/g, function(match) {
        const name = match.substring(1, match.length - 1);
        const emoji = emojis[name];
  
        if (emoji) {
          return `<span><img src="${emoji}" style="width: 1rem; height: 1rem; vertical-align: -0.2rem;"></span>`;
        }
  
        return match;
      });
  
      el.innerHTML = `
      <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; padding: 16px; font-size: 14px; line-height: 1.5; color: #24292e;">
        <div style="display: flex; align-items: center;">
          <svg style="fill: #586069; margin-right: 8px;" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
          <span style="font-weight: 600; color: #0366d6;">
            <a style="text-decoration: none; color: inherit;"> ${name}</a>
          </span>
        </div>
        <div style="display: ${data.fork ? 'block' : 'none'}; font-size: 12px; color: #586069;">Forked from <a style="color: inherit; text-decoration: none;" ></a></div>
        <div style="font-size: 12px; margin-bottom: 16px; margin-top: 8px; color: #586069;"> ${dis_er}</div
      </div> 
      `;
    });
  });