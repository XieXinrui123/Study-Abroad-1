  function handleUserMessage(text) {
    addUserMessage(text);
    messageHistory.push({ role: 'user', text });

    // 提取用户背景信息
    extractUserProfile(text);

    // 追踪话题
    trackTopic(text);

    showTyping();

    setTimeout(() => {
      hideTyping();

      // 先尝试上下文理解（短句追问）
      const contextual = understandWithContext(text);
      if (contextual.isContextual) {
        addBotMessage(contextual.response);
        messageHistory.push({ role: 'bot', text: contextual.response });
        return;
      }

      // 否则走正常FAQ匹配
      const reply = findReply(text);
      addBotMessage(reply.text, reply.actions);
      messageHistory.push({ role: 'bot', text: reply.text });
    }, 600 + Math.random() * 800);
  }

  // ===== 追踪对话话题 =====
  function trackTopic(text) {
    const lower = text.toLowerCase();
    for (const [topic, keywords] of Object.entries(TOPIC_CONTEXT)) {
      for (const kw of keywords) {
        if (lower.includes(kw.toLowerCase())) {
          conversationContext.lastTopic = conversationContext.currentTopic;
          conversationContext.currentTopic = topic;
          return;
        }
      }
    }
  }
