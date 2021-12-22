function displayGroups(groups)
 {
    const groupList = document.querySelector('.groups-list');
    groupList.innerHTML = '';
    groups.forEach((group) => {


      const groupElement = document.createElement('div');

      groupElement.classList = 'group-element';
  
      const groupId = document.createElement('div');

      groupId.textContent = `ID: ${group.group_id}`;
      groupId.classList = 'group-id';
      groupElement.appendChild(groupId);
  
      const groupName = document.createElement('div');

      groupName.textContent = group.name;
      groupName.classList = 'group-name';
      groupElement.appendChild(groupName);
  
      groupList.appendChild(groupElement);

      
      groupElement.addEventListener('click', (e) => {
        document.location = `bills.html?group=${group.group_id}`;
      });
    });
  }
  loadGroups();
  
  