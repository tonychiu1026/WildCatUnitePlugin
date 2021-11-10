using System;
using System.Reflection;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.Idioms;
using FluentAssertions;
using Moq;
using WildCatUnitePlugin;
using Xunit;
using Intel.Unite.Common;
using Intel.Unite.Common.Module.Feature.Hub;
using Intel.Unite.Common.Context;
using Intel.Unite.Common.Core;
using Intel.Unite.Common.Command;
using Intel.Unite.Common.Module.Common;

namespace PluginModuleHandlerTest
{
    public class PluginModuleHandlerTest
    {
        private readonly Type _sutType = typeof(PluginModuleHandler);
        private readonly IFixture _fixture;

        public PluginModuleHandlerTest()
        {
            _fixture = new Fixture().Customize(new AutoMoqCustomization());
        }

        #region Ctor
        
        [Trait("Category", "Unit")]
        [Fact]
        public void Sut_Type_ImplementsInterface()
        {
            // Given
            // When
            // Then
            _sutType.Should().BeAssignableTo<HubFeatureModuleBase>();
        }

        #endregion Ctor

        [Trait("Category", "Unit")]
        [Fact]
        public void UserInfo_UserConnected_MessageSent()//you can run the tests in debug mode and step through the calls..
        {
            // Given
            var runtimeContext = _fixture.Create<Mock<IModuleRuntimeContext>>();
            var userInfo = _fixture.Create<UserInfo>();
            var sut = new PluginModuleHandler(runtimeContext.Object);
            // create the msg here
            var expectedMessage = new Message();
            Message testMessage = null;
            runtimeContext.Setup(mock => mock.MessageSender.TrySendMessage(It.IsAny<Message>()))
                .Callback<Message>(message =>
                {
                    testMessage = message;
                });
            // When
            sut.UserConnected(userInfo);
            // Then
            runtimeContext.Verify(v => v.MessageSender.TrySendMessage(It.IsAny<Message>()), Times.Once);
            testMessage.Should().BeEquivalentTo(expectedMessage);
        }
    }
}
